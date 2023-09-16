import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { global } from './global';

@Injectable()
export class CategoryService {
    public url: string;

    constructor(
        public _http: HttpClient
    ) {
        this.url = global.url;
    }

    create(category: any, token: any): Observable<any> {
        let json = JSON.stringify(category); //Convierte JSON en String
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') //application/x-www-form-urlencoded: Los valores son codificados en tuplas llave-valor separadas por '&', con un '='  entre la llave y el valor.
            .set('Authorization', token);

        return this._http.post(this.url + 'category', params, { headers: headers }); //Esto al final es una peticion AJAX
    }

    getCategories(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'category', { headers: headers });
    }

    getCategoriesPaginate(page: any, search: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'category?page=' + page + '&search=' + search, { headers: headers });
    }

    getCategory(id: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'category/' + id, { headers: headers });
    }

    getPostsByCategory(id: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'post/category/' + id, { headers: headers });
    }

    update(category: any, id: any, token: any): Observable<any> {
        let json = JSON.stringify(category);
        let params = "json=" + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.put(this.url + 'category/' + id, params, { headers: headers });
    }

    delete(id: any, token: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.delete(this.url + 'category/' + id, { headers: headers });
    }
}