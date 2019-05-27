import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Services/order.service';
import { DatePipe } from '@angular/common';
declare var $;
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers:[DatePipe]
})
export class OrdersComponent implements OnInit {
  orders = [];  error:Boolean = false;errormsg:String=null;_id:String;
  token = localStorage.getItem('jwttoken');
  deletconfirm:Boolean = false;
  orderDueDate:any = new Date();
  customerBuyerName:String = null;
  customeAddress:String= null;
  customerPhone:Number= null;
  orderTotal:Number= null;
  constructor(private orderService:OrderService,private datePipe: DatePipe) { }

  ngOnInit() {
      let token = {
        token : localStorage.getItem('jwttoken')
      }
      this.orderService.getOrders(token).subscribe(data=>{
      if(data.success){
        this.error = false;
        this.errormsg = null;
        this.orders = data.message;
        console.log(data)
      }else{
        this.error = true;
        this.errormsg = data.message;
      }
    })
  }
// ADD NEW ORDER
  onAdd(){
   let newOrder = {
     token:this.token,
     orderDueDate:this.orderDueDate,
    customerBuyerName:this.customerBuyerName,
    customeAddress:this.customeAddress,
    customerPhone:this.customerPhone,
    orderTotal:this.orderTotal
   }
    this.orderService.addOrder(newOrder).subscribe(data=>{
      console.log(data)
      if(data.success){
        this.orders.push(data.message);
        $("#exampleModalLong").modal("hide");
      }else{
        this.error = true;
        this.errormsg = data.message;
        $("#exampleModalLong").modal("hide");
      }
    });
  }

  // EDIT ORDER
  onEdit(id){
    let getOrder = {
      _id:id,
      token:this.token
    }
    this.orderService.getOrder(getOrder).subscribe(order=>{
      console.log(order);
      this.token = this.token;
      this._id = order.message[0]._id;
      this.orderDueDate = this.datePipe.transform(order.message[0].orderDueDate, 'yyyy-MM-dd');
      this.customerBuyerName = order.message[0].customerBuyerName;
      this.customeAddress = order.message[0].customeAddress;
      this.customerPhone = order.message[0].customerPhone;
      this.orderTotal = order.message[0].orderTotal;
    });
   }

   onEditSubmit(f){
     console.log(f);
     this.orderService.editOrder(f).subscribe(data=>{
       console.log(data)       
     $("#exampleModalLong1").modal("hide");
     });
   }

   onDelete(id){
      this._id = id;
      this.token = this.token;
   }

   onDeleteSubmit(){
    let delet = {
      _id:this._id,
      token:this.token
   }
      this.orderService.deleteOrder(delet).subscribe(data=>{
        if(data.success){
            for(let i =0 ; i<this.orders.length;i++){
              if(this.orders[i]._id == this._id){
                this.orders.splice(i,1);
                this.error = false;
                this.errormsg = data.message;
                $("#deleteModal").modal("hide");
              }
          }
        }else{
          this.error = true;
          this.errormsg = data.message;
          $("#deleteModal").modal("hide");
        }
      });
   }
}
