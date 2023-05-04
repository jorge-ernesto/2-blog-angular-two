import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {CategoryService} from '../../../services/category.service';
import {PostService} from '../../../services/post.service';
import {Category} from 'src/app/models/category';
import {Post} from '../../../models/post';
import {global} from '../../../services/global';

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
        this.page_title = "Editar post";
        this.url = global.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.is_edit = true;
    }

    ngOnInit(): void {
        this.post = new Post(1, this.identity.sub, 1, '', '', null);
        this.getCategories();
        this.getPost();
    }

    imageUpload(datos){
        console.log("Datos:",JSON.stringify(datos));
        let data = datos.body;
        this.post.image = data.image;
    }

    onSubmit(form){
        this.status = "";
        
        //ENVIAMOS INFORMACION DE POST Y TOKEN
        this._postService.update(this.post, this.post.id, this.token).subscribe(
            response => {
              
                console.log('RESPONSE:', JSON.stringify(response));

                //OBTENEMOS INFORMACION DE RESPUESTA
                if(response.status == "success"){          
                    this.status = "success";
                    //this.post = response.post; //Realmente no es necesario
                    //this._router.navigate(['/post', this.post.id, 'edit']);
                    this._router.navigate(['/home']);
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

    getCategories(){
        this._categoryService.getCategories().subscribe(
            response => {

                //OBTENEMOS CATEGORIAS
                if(response.status == 'success'){
                    this.categories = response.categories;                     
                    console.log("CATEGORIAS:", this.categories);
                }

            },
            error => {
                console.log(<any>error);
            }
        )
    }

    getPost(){
        //SACAR EL ID DEL POST DE LA URL
        this._route.params.subscribe(params => {
            let id = +params['id']; //+ para indicarle que es integer
            //console.log(id);

            //PETICION AJAX PARA SACAR LOS DATOS DEL POST
            this._postService.getPost(id).subscribe(
                response => {
                  
                    //OBTENEMOS LOS DATOS DEL POST
                    if(response.status == "success"){                                  
                        this.post = response.post;
                        console.log('POST:', this.post);   
                        
                        this.validarDuenioPost(this.identity, this.post);
                    }else{                                             
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
    
    validarDuenioPost(identity, post){
        // console.log("validarDueñoPost");
        // console.log(identity);
        // console.log(token);
        // return;
        if(identity && identity.sub == post.user_id){
            return true
        }else{
            this._router.navigate(['/error']);
        }
    }

}
