import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../../models/post';
import { PostService } from '../../../services/post.service';
import { UserService } from '../../../services/user.service';
import { global } from '../../../services/global';

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.css'],
    providers: [PostService, UserService]
})
export class PostDetailComponent implements OnInit {

    public page_title: string;
    public post: any;
    public identity;
    public url;
    // public status: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _postService: PostService,
        private _userService: UserService
    ) {
        this.page_title = "Post detail";
        this.url = global.url;
        this.identity = this._userService.getIdentity();
    }

    ngOnInit(): void {
        this.getPost()
    }

    getPost() {
        //SACAR EL ID DEL POST DE LA URL
        this._route.params.subscribe(params => {
            let id = +params['id']; //+ para indicarle que es integer
            //console.log(id);

            //PETICION AJAX PARA SACAR LOS DATOS DEL POST
            this._postService.getPost(id).subscribe(
                response => {

                    //OBTENEMOS LOS DATOS DEL POST
                    if (response.status == "success") {
                        this.post = response.post;
                        console.log('POST:', this.post);
                    } else {
                        this._router.navigate(['/home']);
                    }

                },
                error => {
                    console.log(<any>error);
                    this._router.navigate(['/home']);
                }
            )
        });
    }

}
