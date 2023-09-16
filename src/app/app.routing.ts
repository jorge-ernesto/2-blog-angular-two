//IMPORTS NECESARIOS
import { Routes, RouterModule } from '@angular/router';

//IMPORTAR COMPONENTES
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

import { PostCreateComponent } from './components/post/post-create/post-create.component';
import { PostEditComponent } from './components/post/post-edit/post-edit.component';
import { PostDetailComponent } from './components/post/post-detail/post-detail.component';

//IMPORTAMOS GUARDS
import { DefaultGuard } from './services/default.guard';
import { IdentityGuard } from './services/identity.guard';

//DEFINIR RUTAS
const APP_ROUTES: Routes = [
    { path: '', component: LoginComponent }, //Vista para loguearse, tambien puede redirigir a inicio
    { path: 'login', component: LoginComponent }, //Vista para loguearse
    { path: 'logout/:sure', component: LoginComponent }, //Funcionalidad para desloguear al usuario
    { path: 'register', component: RegisterComponent }, //Vista para registrar un nuevo usuario
    { path: 'home', component: HomeComponent }, //Vista home
    { path: 'ajustes', component: UserEditComponent, canActivate: [IdentityGuard] }, //Vista para editar un usuario logueado
    { path: 'perfil/:id', component: ProfileComponent }, //Vista para listar post por usuario

    { path: 'category', component: CategoryIndexComponent },                               //Vista para listar categorias
    { path: 'category/create', component: CategoryCreateComponent, canActivate: [IdentityGuard] }, //Vista para crear nueva categoria
    { path: 'category/:id/edit', component: CategoryEditComponent, canActivate: [IdentityGuard] }, //Vista para editar una categoria
    { path: 'category/posts/:id', component: CategoryPostComponent },                               //Vista para listar posts por categoria

    { path: 'post/create', component: PostCreateComponent, canActivate: [IdentityGuard] }, //Vista para crear posts
    { path: 'post/:id/edit', component: PostEditComponent, canActivate: [IdentityGuard] }, //Vista para editar un post
    { path: 'post/:id', component: PostDetailComponent },                               //Vista para mostrar un post

    { path: '**', component: ErrorComponent }                                //vista renderizada en caso el IdentityGuard falle
];

//EXPORTAR CONFIGURACION
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);