import { Component, OnInit, DoCheck, Input } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {CategoryService} from '../../../services/category.service';

@Component({
    selector: 'app-category-nav-item',
    templateUrl: './category-nav-item.component.html',
    styleUrls: ['./category-nav-item.component.css'],
    providers: [UserService, CategoryService]
})
export class CategoryNavItemComponent implements OnInit, DoCheck {

    public identity;
    public token;
    public categories;
    public interval;
    @Input() barra_navegacion;

    constructor(
        private _userService: UserService,
        private _categoryService: CategoryService,
    ) {
        this.loadUser();
    }

    ngOnInit(){
        this.getCategoriesSetInterval();
    }

    ngDoCheck(){
        this.loadUser();
    }

    loadUser(){
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    getCategoriesSetInterval(){
        //TRAEMOS LA DATA DE CATEGORIAS
        this.loadUser();
        if(this.identity && this.identity.sub){ //Solo si esta autenticado
            this.getCategories();
        }

        //EJECUTAMOS CADA 30 SEGUNDOS
        this.interval = setInterval(function(){

            //TRAEMOS LA DATA DE CATEGORIAS
            this.loadUser();
            if(this.identity && this.identity.sub){ //Solo si esta autenticado
                this.getCategories();
            }

        }.bind(this), 30000);
    }

    getCategories(){
        this._categoryService.getCategories().subscribe(
            response => {
                if(response.status == "success"){
                    this.categories = response.categories;
                    // console.log('categories', this.categories);
                }
            },
            error => {
                console.log(<any>error);
            }
        )
    }

}
