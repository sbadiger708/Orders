import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:String;password:String;
  error:Boolean;errmsg:String  = null;
  constructor(private user:UserService,private router:Router) { }

  ngOnInit() {
  }

  onLogin(){
    let user = {
      username:this.username,
      password:this.password
    }
    console.log(user);
    this.user.loginUser(user).subscribe(data =>{
      if(data.success){
        this.errmsg = null;
        this.error = false;
        localStorage.setItem('jwttoken',data.token);
        this.router.navigateByUrl('/orders');
      }else{
        this.error = true;
        this.errmsg = data.message;
      }
    });
  }

}
