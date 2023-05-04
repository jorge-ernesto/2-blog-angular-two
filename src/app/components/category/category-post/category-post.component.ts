import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Category} from '../../../models/category'; 
import {CategoryService} from '../../../services/category.service';
import {UserService} from '../../../services/user.service';
import {PostService} from '../../../services/post.service';
import {global} from '../../../services/global';

@Component({
    selector: 'app-category-post',
    templateUrl: './category-post.component.html',
    styleUrls: ['./category-post.component.css'],
    providers: [CategoryService, UserService, PostService]
})
export class CategoryPostComponent implements OnInit {
    
    public page_title: string;
    public identity;
    public token;
    public url;  
    public category: Category;
    public posts: any;      

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _categoryService: CategoryService,
        private _userService: UserService,
        private _postService: PostService,
    ) { 
        this.url = global.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    ngOnInit(): void {
        this.getPostsByCategory();
    }

    getPostsByCategory(){
        //SACAR EL ID DE LA CATEGORIA DE LA URL
        this._route.params.subscribe(params => {
            let id = +params['id'];            

            //PETICION AJAX PARA SACAR LOS DATOS DE LA CATEGORIA
            this._categoryService.getCategory(id).subscribe(
                response => {

                    //SI LA RESPUESTA ES CORRECTA OBTENEMOS LOS DATOS DE LA CATEGORIA
                    if(response.status == "success"){
                        this.category = response.category;
                        console.log('CATEGORY:', response);

                        //PETICION AJAX PARA SACAR LOS DATOS DE LOS POSTS POR CATEGORIA
                        this._categoryService.getPostsByCategory(id).subscribe(
                            response => {

                                //SI LA RESPUESTA ES CORRECTA OBTENEMOS LOS DATOS DE LOS POSTS POR CATEGORIA
                                if(response.status == "success"){
                                    this.posts = response.posts;
                                    console.log('POSTS POR CATEGORIA:', response);
                                }else{
                                    this._router.navigate(['/inicio']);            
                                }

                            },
                            error => {
                                console.log(<any>error);
                            }
                        );
                    }else{
                        this._router.navigate(['/inicio']);
                    }

                },
                error => {
                    console.log(<any>error);
                }
            );
        });
    }    

}
