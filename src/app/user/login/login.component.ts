import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = {
    email:'',
    password:''
  }

  showAlert = false;
  alertMsg = 'Please wait! We are logging you';
  alertColor = 'blue';
  inSubmission = false;

  constructor(private auth: AngularFireAuth){

  }

  async login(){
    this.showAlert = true;
    this.alertMsg = 'Please wait! We are logging you';
    this.alertColor = 'blue'
    this.inSubmission = true;
    // console.log(this.credentials)
    
    try{

      await this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      )

    }catch(e){
      this.inSubmission = false;
      this.alertMsg = 'Error occured!'
      this.alertColor = 'red'
      return
    }

    this.alertMsg = 'success! You logged in.';
    this.alertColor = 'green'
    
  }

}
