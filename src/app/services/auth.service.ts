import { Injectable } from '@angular/core';
import { User } from "./../class/auth-interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users:Array<User> = [
    {
      mail: 'admin@admin.com',
      name: 'Admin',
      password: '12345'
    }
  ]

  private isLogin:boolean=false;
  private userLogged:User = {
    mail: '',
    name: '',
    password: ''
  };

  constructor() { }

  authenticate(correo:String,password:String):boolean{
    const list = this.users.filter( item => 
      item.mail === correo && item.password === password)
    if (list.length === 1) {
      this.userLogged = list[0];
      this.isLogin = true;     
    }
    return this.isLogin;
  }

  getUserLogged(){
    return this.userLogged;
  }

  getIslogin(){
    return this.isLogin;
  }

  addUser(user:User){
    this.users.push(user)
    console.log(this.users)
  }

  logout(){
    this.isLogin = false;
    this.userLogged = {
      mail: '',
      name: '',
      password: ''
    }
  }

  getIndex(mail:string):number{
    var count = 0;
    this.users.forEach(element => {
      if (mail===element.mail) {
        return count;
      }
      count++;
    });
    return -1;
  }

  setUserList(user:User,index:number){
    this.userLogged = user;
    this.users.splice(index,1,user);
  }
}
