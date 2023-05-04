import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Post} from '../../models/post';
import {PostService} from '../../services/post.service';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {global} from '../../services/global';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    providers: [PostService, UserService]
})
export class ProfileComponent implements OnInit {
    
    public page_title: string;  
    public identity;
    public token;
    public url;
    public posts: Array<Post>;
    public user: User;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _postService: PostService,
        private _userService: UserService,
    ) {
        this.page_title = "Perfil de Usuario";    
        this.url = global.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        // this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '', '');
    }

    ngOnInit(): void {
        this.getProfile();        
    }

    getProfile(){
        //SACAR EL ID DEL POST DE LA URL
        this._route.params.subscribe(params => {
            let userId = +params['id']; //+ para indicarle que es integer
            //console.log(id);

            this.getUser(userId);
            this.getPostsByUser(userId);            
        }); 
    }

    getPostsByUser(userId){
        this._userService.getPostsByUser(userId).subscribe(
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

    getUser(userId){
        this._userService.getUser(userId).subscribe(
            response => {
                if(response.status == 'success'){
                    this.user = response.user;
                    console.log('USER:', this.user);
                }
            },
            error => {        
                console.log(<any>error);
            }
        )
    }

    deletePost(id){
        this._postService.delete(id, this.token).subscribe(
            response => {
                if(response.status == 'success'){          
                    console.log('RESPONSE DELETE:', response);
                    this.getProfile();          
                }
            },
            error => {        
                console.log(<any>error);
            }
        )
    }    

}
