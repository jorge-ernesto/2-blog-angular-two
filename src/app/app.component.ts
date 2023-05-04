import { Component, OnInit, DoCheck } from '@angular/core';
import {UserService} from './services/user.service';
import {global} from './global';

//TODOS LOS PLUGINS DE FROALA
// Import all Froala Editor plugins.
import 'froala-editor/js/plugins.pkgd.min.js';
// Import a single Froala Editor plugin.
import 'froala-editor/js/plugins/align.min.js';
// Import a Froala Editor language file.
import 'froala-editor/js/languages/de.js';
// Import a third-party plugin.
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/third_party/image_tui.min';
import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/js/third_party/embedly.min';
//CERRAR TODOS LOS PLUGINS DE FROALA

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
    
    title = 'blog-angular';
    public identity;
    public token;
    public url;
    public categories;
    public interval;

    constructor(
        public _userService: UserService,
    ){
        this.loadUser();
        this.url = global.url;
        console.log("Constructor carga primero");
    }

    ngOnInit(){
        console.log("ngOnInit carga despues de constructor");
        console.log("Webapp cargada correctamente");        
    }  

    ngDoCheck(){
        //MANTENEMOS ESTO, YA QUE DEBEMOS LEER LAS VARIABLES IDENTITY Y TOKEN PARA ACTUALIZAR LA BARRA DE NAVEGACION
        this.loadUser();
    }

    loadUser(){
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        
        // console.log('CARGAMOS DATOS DE USUARIOS QUE SE CARGAN AUTOMATICAMENTE');
        // console.log('IDENTITY:',this.identity);
        // console.log('TOKEN:',this.token);
    }

}
