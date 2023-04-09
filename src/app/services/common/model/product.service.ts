import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/Create_Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService : HttpClientService) { }


  create(product : Create_Product){
    this.httpClientService.post({
      controller : "products"
    },product).subscribe((result)=>{
      result ? alert("Başarili") : alert("Hata")
    });
  }


}
