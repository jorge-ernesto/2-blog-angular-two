import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { global } from '../../../services/global';

declare var jQuery: any;
declare var $: any;

@Component({
    selector: 'app-category-create',
    templateUrl: './category-create.component.html',
    styleUrls: ['./category-create.component.css'],
    providers: [UserService, CategoryService]
})
export class CategoryCreateComponent implements OnInit {

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
        this.page_title = "Crear categoria";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.category = new Category(1, '', '');
        this.status = "";
        this.is_edit = false;
    }

    ngOnInit(): void {
        // Cambiar la fecha seteando el modelo
        this.category.date_publication = global.getFechaActual();

        // Cambiar la fecha con Jquery
        // $('#date_publication').val('2020-01-01');
    }

    onSubmit(form: any) {
        this.status = "";

        //ENVIAMOS INFORMACION DE CATEGORIA Y TOKEN
        this._categoryService.create(this.category, this.token).subscribe(
            response => {

                console.log("RESPONSE:", JSON.stringify(response));

                //OBTENEMOS INFORMACION DE RESPUESTA
                if (response.status == "success") {
                    this.status = 'success';
                    this.clearForm(form);
                    this._router.navigate(['/category/create']);
                } else {
                    this.status = 'error';
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
        form.controls['name'].reset();
        // form.controls['date_publication'].reset(); //Esto no queremos resetear
    }

}
