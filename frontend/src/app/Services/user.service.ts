import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

export interface Response{
  success:boolean,
  message:any,
  token:string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  signupUser(newUser){
      return this.http.post<Response>(environment.baseUrl+'signup',newUser)
        .pipe(map(res => res));
  }
  loginUser(user){
    return this.http.post<Response>(environment.baseUrl+'login',user)
      .pipe(map(res => res));
  }
}
