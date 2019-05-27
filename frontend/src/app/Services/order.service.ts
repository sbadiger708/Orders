import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Response } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  getOrders(token){
    return this.http.post<Response>(environment.baseUrl+'getorders',token)
      .pipe(map(res => res));
  }

  getOrder(order){
    return this.http.post<Response>(environment.baseUrl+'getorder',order)
      .pipe(map(res  => res));
  }

  addOrder(newOrder){
    return this.http.post<Response>(environment.baseUrl+'addorders',newOrder)
      .pipe(map(res  => res));
  }

  editOrder(newOrder){
    return this.http.put<Response>(environment.baseUrl+'updateorder',newOrder)
    .pipe(map(res  => res));
  }

  deleteOrder(order){
    return this.http.post<Response>(environment.baseUrl+'deleteorder',order)
    .pipe(map(res  => res));
  }
}
