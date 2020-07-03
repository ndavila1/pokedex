import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckSame } from "./../../validator/check-same.validator";
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { User } from 'src/app/class/auth-interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  user:FormGroup;
  hide = true;
  account:User;
  editMode = false;
  userLogged:User = {
    mail: '',
    name: '',
    password: ''
  };
  title='';
  show = true;
  
  constructor(private auth:AuthService, private snackBar: MatSnackBar,private router:Router) {}

  ngOnInit() {
    if (this.auth.getIslogin()) {
      this.userLogged = this.auth.getUserLogged()
      this.changeFormGroup(true,this.userLogged.name,this.userLogged.mail,this.userLogged.password,this.userLogged.password)
      this.editMode = true;
      this.title = 'Account information'
      this.show = false;
    }else{
      this.changeFormGroup(false,'','','','')
      this.title = 'Create a new Account'  
    }
  }

  onSubmit(){
    this.account = {
      mail : this.user.value.email,
      name : this.user.value.name,
      password : this.user.value.password
    }
    if (this.editMode) {
      console.log(this.account)
      const i = this.auth.getIndex(this.user.value.email);
      this.auth.setUserList(this.account,i);
      this.router.navigate(['pokedex']);
      this.snackBar.open('your account has been updated successfully!!!!', 'Undo', {
      duration: 2000,
    }); 
    } else {
      this.auth.addUser(this.account)
      this.router.navigate(['login']);
      this.snackBar.open('your account has been created successfully!!!!', 'Undo', {
      duration: 2000,
    }); 
    }
  }

  getErrorMessageEmail() {
    return this.user.controls.email.hasError('required') ? 'Email is required' :
    this.user.controls.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  getErrorMessagePassword(){
    if (this.user.controls.password.hasError('required')) {
      return 'Password is required'
    }else if (this.user.controls.password.hasError('pattern')){
      if (!((this.user.value.password).match('^.{8,}$'))) {
        return 'At least 8 characters'
      } else if (!(/^(?=(?:.*[A-Z]){2}).{8,}$/.test(this.user.value.password))) {
        return 'Min 2 capital letters'
      } else if (!(/^(?=(?:.*\d){1}).{8,}$/.test(this.user.value.password))) {
        return 'Min 1 digits'
      } else if (!(/^(?=(?:.*\W){1}).{8,}$/.test(this.user.value.password))) {
        return 'Min 1 special character'
      }else{
        return 'Min 1 lowercase letter'
      }
    }
  }

  checkSame(): boolean {
    return this.user.hasError('notSame') &&
    this.user.controls.password.dirty &&
    this.user.controls.passwordRepeat.dirty;;
  }

  isLogin(){
    return this.auth.getIslogin();
  }

  changeFormGroup(value:boolean,name,email,password,passwordRepeat){
    this.user = new FormGroup({
      name: new FormControl({value: name, disabled: value}, [Validators.required]),
      email: new FormControl({value: email, disabled: value}, [Validators.email, Validators.required]),
      password: new FormControl({value: password, disabled: value}, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.{2,}[A-Z])(?=.*[0-9])(?=.*\\W).{8,}$')]),
      passwordRepeat: new FormControl({value: passwordRepeat, disabled: value}, [Validators.required],), 
    },
    {
      validators: CheckSame
    }
    );      
  }
  changeEditMode(){
    this.changeFormGroup(this.show,this.userLogged.name,this.userLogged.mail,this.userLogged.password,this.userLogged.password)
    this.show = !this.show;
  }


}
