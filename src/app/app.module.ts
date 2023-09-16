import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_ROUTING } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { NgxPaginationModule } from 'ngx-pagination';

//COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ErrorComponent } from './components/error/error.component';

import { CategoryIndexComponent } from './components/category/category-index/category-index.component';
import { CategoryCreateComponent } from './components/category/category-create/category-create.component';
import { CategoryEditComponent } from './components/category/category-edit/category-edit.component';
import { CategoryPostComponent } from './components/category/category-post/category-post.component';
import { CategoryNavItemComponent } from './components/category/category-nav-item/category-nav-item.component';

import { PostCreateComponent } from './components/post/post-create/post-create.component';
import { PostEditComponent } from './components/post/post-edit/post-edit.component';
import { PostDetailComponent } from './components/post/post-detail/post-detail.component';
import { PostListComponent } from './components/post/post-list/post-list.component';

//IMPORTAMOS GUARDS
import { UserService } from './services/user.service'; //Ademas de añadir los guards, y para que estos funcionen es importante añadir el UserService porque de manera global necesitamos tener acceso a ese servicio
import { DefaultGuard } from './services/default.guard';
import { IdentityGuard } from './services/identity.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    ProfileComponent,
    ErrorComponent,
    CategoryIndexComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    CategoryPostComponent,
    PostListComponent,
    CategoryNavItemComponent,
    PostCreateComponent,
    PostEditComponent,
    PostDetailComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [
    UserService,
    DefaultGuard,
    IdentityGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
