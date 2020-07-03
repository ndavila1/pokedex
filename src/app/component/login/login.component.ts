import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login:FormGroup;
  hide = true;

  constructor(private auth:AuthService,private router:Router,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.login = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  getErrorMessageEmail() {
    return this.login.controls.email.hasError('required') ? 'Email is required' :
    this.login.controls.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  onSubmit(){
    if(this.auth.authenticate(this.login.value.email,this.login.value.password) ){
      this.router.navigate(['pokedex']);
    }else{
      this.snackBar.open('Oppps maybe you made a mistake!!!!', 'Undo', {
        duration: 2000,
      });
    } 
  }

}

