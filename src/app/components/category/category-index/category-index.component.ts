import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';

@Component({
    selector: 'app-category',
    templateUrl: './category-index.component.html',
    styleUrls: ['./category-index.component.css'],
    providers: [UserService, CategoryService]
})
export class CategoryIndexComponent implements OnInit {

    public page_title: string;
    public identity;
    public token;
    public categories_: any;
    public status: string;
    public search: any;

    //Variables para ngx-pagination
    public data: any;    //Variable que contendra la información
    public page: number; //Pagina en la que nos encontramos
    public total: number; //Total de datos totales en la BD
    public perPage: number; //Cuantos elementos mostraremos
    public from: any; //Desde el registro numero 1
    public to: any; //Hasta el registro numero 10
    //Cerrar Variables para ngx-pagination

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _categoryService: CategoryService,
    ) {
        this.page_title = "Listar categoria";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.status = "";

        //Variables para ngx-pagination
        this.page = 1;
        this.total = 0;
        this.perPage = 5;
        //Cerrar Variables para ngx-pagination
    }

    ngOnInit(): void {
        /**
         * Metodo para recorger informacion de la url al iniciar componente
         * queryParams obtiene parametros GET como ?page=1, funciona diferente a params que obtiene las variables de la url especificadas en app.routing.ts
         */
        this._route.queryParams.subscribe((params: Params) => {
            this.page = +params["page"] || 1; //Si no encuentra el primer dato o falla de algun modo al obtenerlo, mostrara 1
            this.search = params["search"] || undefined; //Tambien puede ser || null
            this.getCategoriesPaginate(this.page, this.search);
            window.scrollTo(0, 0);
            // console.log('page', this.page);
        });
    }

    /**
     * Metodo que obtiene la información de categorias con paginacion
     */
    getCategoriesPaginate(page: any, search: any) {
        this._categoryService.getCategoriesPaginate(page, search).subscribe(
            response => {
                if (response.status == 'success') {
                    this.categories_ = response.categories_;

                    //Variables para ngx-pagination
                    this.data = response.categories_.data;
                    this.page = +response.categories_.current_page;
                    this.total = +response.categories_.total;
                    this.perPage = +response.categories_.per_page;
                    this.from = +response.categories_.from;
                    this.to = +response.categories_.to;
                    //Cerrar Variables para ngx-pagination

                    console.log('response:', response);
                    console.log('CATEGORIES:', this.categories_);
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    /**
     * Metodo que sirve para hacer el cambio de pagina facilitado por ngx-pagination
     */
    pageChanged(page: any) {
        this.page = page; //Le asigna el valor a Pagina en la que nos encontramos, por defecto es 1
        let search = this.search;

        const queryParams: Params = { page, search };
        this._router.navigate(
            [],
            {
                relativeTo: this._route,
                queryParams
            }
        );
        this.getCategoriesPaginate(this.page, this.search);
    }

    /**
     * Metodo para eliminar categorias
     */
    deleteCategory(id: any) {
        // console.log('deleteCategory')
        // console.log(id, this.token)

        this.status = "";
        this._categoryService.delete(id, this.token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.status = 'success';
                    console.log('RESPONSE DELETE:', response);
                    this.getCategoriesPaginate(this.page, this.search);
                }
            },
            error => {
                this.status = 'error';
                console.log(<any>error);
            }
        );
    }

}
