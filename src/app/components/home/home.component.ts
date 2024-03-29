import { Component, OnInit } from '@angular/core';
import {Post} from '../../models/post';
import {PostService} from '../../services/post.service';
import {UserService} from '../../services/user.service';
import {global} from '../../services/global';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [PostService, UserService]
})
export class HomeComponent implements OnInit {
    
    public page_title: string;  
    public identity;
    public token;
    public url;
    public posts: any;

    constructor(
        private _postService: PostService,
        private _userService: UserService,
    ) {
        this.page_title = "Inicio";    
        this.url = global.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    ngOnInit(): void {
        this.getPosts();
    }

    getPosts(){
        this._postService.getPosts().subscribe(
            response => {
                if(response.status == 'success'){
                    this.posts = response.posts;
                    console.log('POSTS:', this.posts);
                }
            },
            error => {        
                console.log(<any>error);
            }
        );
    }

    deletePost(id: any){
        this._postService.delete(id, this.token).subscribe(
            response => {
                if(response.status == 'success'){          
                    console.log('RESPONSE DELETE:', response);
                    this.getPosts();          
                }
            },
            error => {        
                console.log(<any>error);
            }
        )
    }

}
