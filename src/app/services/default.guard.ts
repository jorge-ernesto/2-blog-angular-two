import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {UserService} from './user.service';

@Injectable()
export class DefaultGuard implements CanActivate{
   constructor(
      private _router: Router,
      private _userService: UserService
   ){}

   canActivate(){
      return true
   }
}
