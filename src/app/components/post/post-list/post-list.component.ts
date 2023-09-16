import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { PostService } from '../../../services/post.service';

@Component({
    selector: 'post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
    providers: [UserService, PostService]
})
export class PostListComponent implements OnInit {

    @Input() posts: any;
    @Input() identity: any;
    @Input() url: any;

    public token; //El token no lo permite obtener por @Input, quizas por el largo de la variable, asi que lo obtenemos por UserService

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _postService: PostService,
    ) {
        this.token = this._userService.getToken();
    }

    ngOnInit(): void {
    }

    getPosts() {
        this._postService.getPosts().subscribe(
            response => {
                if (response.status == 'success') {
                    this.posts = response.posts;
                    console.log('POSTS:', this.posts);
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    deletePost(id: any) {
        // console.log('deletePost');
        // console.log(id, this.token);

        this._postService.delete(id, this.token).subscribe(
            response => {
                if (response.status == 'success') {
                    console.log('RESPONSE DELETE:', response);
                    this.getPosts();
                    this._router.navigate(['/home']);
                }
            },
            error => {
                console.log(<any>error);
            }
        )
    }

}
