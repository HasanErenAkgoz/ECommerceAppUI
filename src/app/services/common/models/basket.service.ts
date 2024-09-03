import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';
import { CreateBasketItem } from 'src/app/contracts/basket/create-basket-item';
import { UpdateBasketItem } from 'src/app/contracts/basket/update-basket-item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService : HttpClientService) { }

 async getAll() : Promise<ListBasketItem[]>{
    const observable : Observable<ListBasketItem[]> = this.httpClientService.get({
      controller : "Basket",
    })

  return await firstValueFrom(observable)
  }

 async add(basketItem : CreateBasketItem) : Promise<any>{
   const observable : Observable<any> = this.httpClientService.post({
      controller : "Basket",
    },basketItem)

    return await firstValueFrom(observable)
  }

  
 async update(basketItem : UpdateBasketItem) : Promise<any>{
  const observable : Observable<any> = this.httpClientService.put({
     controller : "Basket",
   },basketItem)
   return await firstValueFrom(observable)
 }

 async remove(basketItemId : string){
  const observable : Observable<any> = this.httpClientService.detele({
    controller  : "Basket",
  },basketItemId)
  return await firstValueFrom(observable);
 }
}

