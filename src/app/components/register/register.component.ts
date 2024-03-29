import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [UserService]
})
export class RegisterComponent implements OnInit {

    public page_title: string;
    public user: User;
    public status: any;

    constructor(
        private _userService: UserService
    ) {
        this.page_title = "Registrate";
        this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '', '');
    }

    ngOnInit(): void {
        console.log("Componente de registro lanzado");
        console.log(this._userService.test());
    }

    onSubmit(form: any) {
        // console.log("Usuario")
        // console.log(this.user);

        this._userService.register(this.user).subscribe(
            response => {
                if (response.status == "success") {
                    this.status = 'success';
                    form.reset();
                    console.log(response);
                } else {
                    this.status = 'error';
                    console.log(response);
                }
            },
            error => {
                this.status = 'error';
                console.log(<any>error);
            }
        );
    }

}
