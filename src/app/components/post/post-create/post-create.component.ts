import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { CategoryService } from '../../../services/category.service';
import { PostService } from '../../../services/post.service';
import { Category } from 'src/app/models/category';
import { Post } from '../../../models/post';
import { global } from '../../../services/global';

declare var jQuery: any;
declare var $: any;

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css'],
    providers: [UserService, CategoryService, PostService] //ESTO ES MUY IMPORTANTE, SIN CARGARLO EN LOS PROVIDERS NO FUNCIONARA
})
export class PostCreateComponent implements OnInit {

    public page_title: string;
    public identity;
    public token;
    public url;
    public categories: any;
    public post: any;
    public status: any;
    public is_edit: boolean;

    //OPCIONES DE FROALA
    public froala_options: Object = {
        charCounterCount: true,
        language: 'es',
        toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
        toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
        toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
        toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
    };

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _categoryService: CategoryService,
        private _postService: PostService,
    ) {
        this.page_title = "Crear post";
        this.url = global.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.is_edit = false;
    }

    ngOnInit(): void {
        this.post = new Post(1, this.identity.sub, 1, '', '', '');
        this.getCategories();

        $('.custom-file-input').on('change', function (event: any) {
            var inputFile = event.currentTarget;
            $(inputFile).parent()
                .find('.custom-file-label')
                .html(inputFile.files[0].name);
        });
    }

    imageUpload(event: any) {
        console.log("Datos:", event);
        let selectedFile = event.target.files[0];

        // Enviar imagen
        // Deberia validar que solo se pueda subir imagenes de tipo .jpg, .png, .gif, .jpeg
        // Deberia validar que el peso maximo de subida de 50 MB
        const formData = new FormData();
        formData.append('file0', selectedFile);

        this._postService.uploadImage(formData, this.token).subscribe(
            (response) => {
                console.log('Imagen subida con éxito:', response);
                // Aquí puedes manejar la respuesta del servidor
                this.post.image = response.image;
            },
            (error) => {
                console.error('Error al subir la imagen:', error);
                // Maneja los errores aquí
            }
        );
    }

    onSubmit(form: any) {
        this.status = "";

        //ENVIAMOS INFORMACION DE POST Y TOKEN
        this._postService.create(this.post, this.token).subscribe(
            response => {

                console.log('RESPONSE:', JSON.stringify(response));

                //OBTENEMOS INFORMACION DE RESPUESTA
                if (response.status == "success") {
                    this.status = "success";
                    this.clearForm(form);
                    this.ngOnInit();
                    this._router.navigate(['/post/create']);
                } else {
                    this.status = "error";
                }

            },
            error => {
                this.status = 'error';
                console.log(<any>error);
            }
        );
    }

    /**
    * Uso de form.controls en lugar de form.reset
    * https://stackoverflow.com/questions/50197347/how-to-reset-only-specific-fields-of-form-in-angular-5
    */
    clearForm(form: any) {
        // Metodo 1
        // console.log('form', form);
        // form.reset();
        // Metodo 2
        form.controls['title'].reset();
        form.controls['content'].reset();
        // form.controls['category_id'].reset(); //Esto no queremos resetear
    }

    getCategories() {
        this._categoryService.getCategories().subscribe(
            response => {

                //OBTENEMOS CATEGORIAS
                if (response.status == 'success') {
                    this.categories = response.categories;
                    console.log("CATEGORIAS:", this.categories);
                    this.cargarCombo(response);
                }

            },
            error => {
                console.log(<any>error);
            }
        )
    }

    /**
    * Metodo para cargar el combo con el primer elemento del array
    */
    cargarCombo(response: any) {
        if (!this.is_edit) {
            this.post.category_id = response.categories[0].id; //De este modo el combo Categorias, mostrara siempre el primer elemento solo si es vista crear
        }
    }

}
