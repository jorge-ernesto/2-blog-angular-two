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
    selector: 'app-post-edit',
    templateUrl: './../post-create/post-create.component.html',
    styleUrls: ['./../post-create/post-create.component.css'],
    providers: [UserService, CategoryService, PostService] //ESTO ES MUY IMPORTANTE, SIN CARGARLO EN LOS PROVIDERS NO FUNCIONARA
})
export class PostEditComponent implements OnInit {

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
        this.page_title = "Editar post";
        this.url = global.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.is_edit = true;
    }

    ngOnInit(): void {
        this.post = new Post(1, this.identity.sub, 1, '', '', '');
        this.getCategories();
        this.getPost();

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

        // Enviamos imagen
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
        this._postService.update(this.post, this.post.id, this.token).subscribe(
            response => {

                console.log('RESPONSE:', JSON.stringify(response));

                //OBTENEMOS INFORMACION DE RESPUESTA
                if (response.status == "success") {
                    this.status = "success";
                    //this.post = response.post; //Realmente no es necesario
                    //this._router.navigate(['/post', this.post.id, 'edit']);
                    this._router.navigate(['/home']);
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

    getCategories() {
        this._categoryService.getCategories().subscribe(
            response => {

                //OBTENEMOS CATEGORIAS
                if (response.status == 'success') {
                    this.categories = response.categories;
                    console.log("CATEGORIAS:", this.categories);
                }

            },
            error => {
                console.log(<any>error);
            }
        )
    }

    getPost() {
        //SACAR EL ID DEL POST DE LA URL
        this._route.params.subscribe(params => {
            let id = +params['id']; //+ para indicarle que es integer
            //console.log(id);

            //PETICION AJAX PARA SACAR LOS DATOS DEL POST
            this._postService.getPost(id).subscribe(
                response => {

                    //OBTENEMOS LOS DATOS DEL POST
                    if (response.status == "success") {
                        this.post = response.post;
                        console.log('POST:', this.post);

                        this.validarDuenioPost(this.identity, this.post);
                    } else {
                        this._router.navigate(['/home']);
                    }

                },
                error => {
                    console.log(<any>error);
                    this._router.navigate(['/home']);
                }
            )
        });
    }

    validarDuenioPost(identity: any, post: any) {
        // console.log("validarDueñoPost");
        // console.log(identity);
        // console.log(token);
        // return;
        if (identity && identity.sub == post.user_id) {
            return true
        } else {
            return this._router.navigate(['/error']);
        }
    }

}
