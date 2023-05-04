import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {CategoryService} from '../../../services/category.service';
import {PostService} from '../../../services/post.service';
import {Category} from 'src/app/models/category';
import {Post} from '../../../models/post';
import {global} from '../../../services/global';

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
    public categories: Category;
    public post: Post;
    public status: string;
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

    //OPCIONES DE ANGULAR FILE UPLOADER
    public afuConfig = {
        multiple: false,
        formatsAllowed: ".jpg,.png, .gif, .jpeg",
        maxSize: "50",
        uploadAPI:  {
            url: global.url+'post/upload',
            method:"POST",
            headers: {     
                "Authorization" : this._userService.getToken()
            }
        },
        theme: "attachPin",
        hideProgressBar: false,
        hideResetBtn: true,
        hideSelectBtn: false,    
        fileNameIndex : true,
        replaceTexts: {      
            selectFileBtn : ' Seleccionar archivos ' , 
            resetBtn : ' Restablecer ' , 
            uploadBtn : ' Subir ' , 
            dragNDropBox : ' Arrastrar y soltar ' ,       
            attachPinBtn: ' Sube tu imagen ',
            afterUploadMsg_success : ' ¡Subido con éxito! ' , 
            afterUploadMsg_error : ' ¡Error al cargar ! ' , 
            sizeLimit : ' Límite de tamaño ' 
        }
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
        this.post = new Post(1, this.identity.sub, 1, '', '', null);
        this.getCategories();
    }

    imageUpload(datos){
        console.log("Datos:",JSON.stringify(datos));
        let data = datos.body;
        this.post.image = data.image;
    }

    onSubmit(form){
        this.status = "";
        
        //ENVIAMOS INFORMACION DE POST Y TOKEN
        this._postService.create(this.post, this.token).subscribe(
            response => {
              
                console.log('RESPONSE:', JSON.stringify(response));

                //OBTENEMOS INFORMACION DE RESPUESTA
                if(response.status == "success"){          
                    this.status = "success";
                    this.clearForm(form);
                    this.ngOnInit();
                    this._router.navigate(['/post/create']);
                }else{
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
    clearForm(form){
        // Metodo 1
        // console.log('form', form);
        // form.reset();
        // Metodo 2
        form.controls['title'].reset();
        form.controls['content'].reset();
        // form.controls['category_id'].reset(); //Esto no queremos resetear
    }

    getCategories(){
        this._categoryService.getCategories().subscribe(
            response => {

                //OBTENEMOS CATEGORIAS
                if(response.status == 'success'){
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
    cargarCombo(response){
        if(!this.is_edit){
            this.post.category_id = response.categories[0].id; //De este modo el combo Categorias, mostrara siempre el primer elemento solo si es vista crear
        }
    }

}
