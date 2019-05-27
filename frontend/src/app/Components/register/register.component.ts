import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username:String;password:String;
  error:Boolean = false;
  errormsg:String = null;
  constructor(private register:UserService,private router:Router) { }

  ngOnInit() {
  }
  onSignup(){
    let newUser = {
      username:this.username,
      password:this.password
    }
    this.register.signupUser(newUser).subscribe(data=>{
      if(data.success){
        this.error = false;
        this.errormsg = null;
        this.router.navigateByUrl('/login');
      }else{
        this.error = true;
        this.errormsg = data.message;
      }
    });
  }

}
