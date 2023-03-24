import { Component } from '@angular/core';
import{FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import IUser from 'src/app/models/user.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  constructor(private auth: AuthService){}

  inSubmission = false;

  name= new FormControl('',[
    Validators.required,
    Validators.minLength(3)
  ]);
  email= new FormControl('',[
    Validators.required,
  Validators.email
  ]
  );
  age= new FormControl<number | null>(null,[
    Validators.required,
    Validators.min(18),
    Validators.maxLength(80)
  ]);
  password= new FormControl('',[
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ]);
  confirm_password= new FormControl('',[
    Validators.required
  ]);
  phoneNumber= new FormControl('',[
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10)
  ]);


  showAlert = false;
  alertMsg = 'Please Wait! Your account is being created'
  alertColor = 'blue'
  


  registerForm = new FormGroup({

    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber,
    
     
  })


  async register(){
    this.showAlert = true;
    this.alertMsg = 'Please wait your account is being created'
    this.alertColor = 'blue'
    this.inSubmission = true


    try{
      this.auth.createUser(this.registerForm.value as IUser)

    }catch(e){
      console.error(e)
      this.alertMsg = 'Error occured! Please try again'
      this.alertColor = 'red'
      this.inSubmission = false
      return
    }

    this.alertMsg = 'Success! Your account is created'
    this.alertColor = 'green'

  }

}
