import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {global} from './global';

@Injectable()
export class UserService{
    public url: string;
    public identity;
    public token;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.url;
    }

    test(){
        return "Hola mundo desde un servicio";
    }

    register(user): Observable<any>{
        //Limpiar campo description (editor texto enriquecido) htmlEntities > utf8
        user.description = global.htmlEntities(user.description);

        let json = JSON.stringify(user);
        let params = 'json='+json;        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.post(this.url+'register', params, {headers: headers});
    }

    signup(user, getToken = false): Observable<any>{
        //Esto envia el flag para que obtenga el token decodificado
        if(getToken == true){
            user.getToken = true;
        }

        let json = JSON.stringify(user); //Convierte JSON en String
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); //application/x-www-form-urlencoded: Los valores son codificados en tuplas llave-valor separadas por '&', con un '='  entre la llave y el valor.

        return this._http.post(this.url+'login', params, {headers:headers}); //Esto al final es una peticion AJAX
    }

    update(user, token): Observable<any>{
        //Limpiar campo description (editor texto enriquecido) htmlEntities > utf8
        user.description = global.htmlEntities(user.description);

        let json = JSON.stringify(user);
        let params = "json="+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);

        return this._http.put(this.url+'user/update', params, {headers:headers});
    }        

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));
        
        if(identity && identity != undefined){
            this.identity = identity;
        }else{
            this.identity = null;
        }

        return this.identity;
    }

    getToken(){
        let token = JSON.parse(localStorage.getItem('token'));
        
        if(token && token != undefined){
            this.token = token;
        }else{
            this.token = null;
        }
        
        return this.token;
    }

    getPostsByUser(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'post/user/'+id, {headers: headers});
    }

    getUser(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'user/detail/'+id, {headers: headers});
    }
}