import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {Category} from '../../../models/category'; 
import {CategoryService} from '../../../services/category.service';
import {global} from '../../../services/global';

declare var jQuery:any;
declare var $:any;

@Component({
    selector: 'app-category-edit',
    templateUrl: './../category-create/category-create.component.html',
    styleUrls: ['./../category-create/category-create.component.css'],
    providers: [UserService, CategoryService]
})
export class CategoryEditComponent implements OnInit {

    public page_title: string;  
    public identity;
    public token;
    public category: Category;  
    public status: string;
    public is_edit: boolean;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,    
        private _userService: UserService,
        private _categoryService: CategoryService,
    ) { 
        this.page_title = "Editar categoria";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.category = new Category(1, '', '');    
        this.status = "";  
        this.is_edit = true;
    }

    ngOnInit(): void {       
        // Cambiar la fecha seteando el modelo        
        this.category.date_publication = global.getFechaActual();

        // Cambiar la fecha con Jquery
        // $('#date_publication').val('2020-01-01');

        this.getCategory();
    } 

    onSubmit(form){
        this.status = "";

        //ENVIAMOS INFORMACION DE CATEGORIA Y TOKEN
        this._categoryService.update(this.category, this.category.id, this.token).subscribe(
            response => {        

                console.log("RESPONSE:", JSON.stringify(response));

                //OBTENEMOS INFORMACION DE RESPUESTA        
                if(response.status == "success"){          
                    this.status = 'success';
                    //this.category = response.category; //Realmente no es necesario
                    //this._router.navigate(['/category']);
                    this._router.navigate(['/category', this.category.id, 'edit']);
                }else{             
                    this.status = 'error';          
                }

            },
            error => {
                this.status = 'error';
                console.log(<any>error);
            }
        );
    }
    
    getCategory(){
        //SACAR EL ID DEL POST DE LA URL
        this._route.params.subscribe(params => {
            let id = +params['id']; //+ para indicarle que es integer
            //console.log(id);

            //PETICION AJAX PARA SACAR LOS DATOS DE LA CATEGORIA
            this._categoryService.getCategory(id).subscribe(
                response => {
                  
                    //OBTENEMOS LOS DATOS DE LA CATEGORIA
                    if(response.status == "success"){                                  
                        this.category = response.category;                        
                        console.log('CATEGORY:', this.category);   
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

}
