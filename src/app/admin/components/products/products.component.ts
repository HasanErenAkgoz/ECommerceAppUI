import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private httpClientService : HttpClientService) {
    super(spinner);
  }
  ngOnInit(): void {
    // this.post()
    // this.put()
    // this.delete();
    this.httpClientService.get({
      controller : "products"
    }).subscribe((data)=>{
      console.log(data)
    })
  }

  post(){
    this.httpClientService.post({
      controller : "products"
    },{
      name : "Computer",
      stock : 200,
      price : 2500
    }).subscribe();

    this.httpClientService.post({
      controller :"products"
    },{
      name : "Mause",
      stock : 400,
      price : 20
    }).subscribe();

    this.httpClientService.post({
      controller : "products"
    },{
      name : "Headphone",
      stock : 150,
      price : 200
    }).subscribe();
  }

  put(){
    this.httpClientService.put({
      controller : "products"
    }, {
      id : "063b2d25-28e5-43e8-aa52-1caa6d161a11",
      name : "EarPhone",
      stock : 300,
      price : 20
    }).subscribe()  
  }

  delete(){
    this.httpClientService.detele({
      controller : "products"
    },"063b2d25-28e5-43e8-aa52-1caa6d161a11").subscribe();
  }

}
