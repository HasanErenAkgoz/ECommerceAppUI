import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/Product/Create_Product';
import { List_Product } from 'src/app/contracts/Product/List_Product';
import { firstValueFrom, Observable } from 'rxjs';
import { List_Product_Image } from 'src/app/contracts/productImage/List_Product_Image';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService : HttpClientService) { }


  create(product : Create_Product, successCallBack? : any, errorCallBack?: any){
    this.httpClientService.post({
      controller : "products"
    },product).subscribe((result)=>{
      successCallBack();
    }, (errorResponse : HttpErrorResponse)=>{
        const _error : Array<{key : string , value : Array<string>}> = errorResponse.error;
        let message = ""
        _error.forEach((v, index)=>{
            v.value.forEach((_v,_index)=>{
              message += `${_v}<br>`;
            });
        });
        errorCallBack(message);
    });
  }

  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalProductCount: number; products: List_Product[] }> {
    const promiseData: Promise<{ totalProductCount: number; products: List_Product[] }> = this.httpClientService.get<{ totalProductCount: number; products: List_Product[] }>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }
  
 async delete(id : string){

   const deleteObservable : Observable<number> = this.httpClientService.detele<number>({
      controller : "products"
    },id)
    await firstValueFrom(deleteObservable)
  }

 async readImages(id : string,successCallBack?: () => void) : Promise<List_Product_Image[]>{
   const getObservable : Observable<List_Product_Image[]> = this.httpClientService.get<List_Product_Image[]>({
      action : "GetProductImages",
      controller : "products",
    },id)

    const images : List_Product_Image[] = await firstValueFrom(getObservable);
    successCallBack();
   return images;
  }

  async deleteImage(id : string, imageId : string,successCallBack?: () => void) {
     const deleteObservable = this.httpClientService.detele({
        action : "deleteproductimage",
        controller : "products",
        queryString : `imageId=${imageId}`
      },id)

      firstValueFrom(deleteObservable);
      successCallBack();
  }

  async changeShowcaseImage(imageId: string, productId: string, successCallBack?: () => void): Promise<void> {
    const changeShowcaseImageObservable = this.httpClientService.get({
      controller: "products",
      action: "ChangeShowCase",
      queryString: `imageId=${imageId}&productId=${productId}`
    });
    await firstValueFrom(changeShowcaseImageObservable);
    successCallBack();
  }
}
