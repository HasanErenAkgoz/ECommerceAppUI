import { BasketService } from './../../../../services/common/models/basket.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageType } from '@microsoft/signalr';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/Product/List_Product';
import { BaseUrl } from 'src/app/contracts/base-url';
import { CreateBasketItem } from 'src/app/contracts/basket/create-basket-item';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(private customToastrService : CustomToastrService,private basketService : BasketService,private productService: ProductService, private activatedRoute: ActivatedRoute
    , private fileService: FileService,spinner: NgxSpinnerService) { 
      super(spinner);
    }

  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 12;
  pageList: number[] = [];
  baseUrl: BaseUrl;
  products: List_Product[];
  async ngOnInit() {
    this.baseUrl = await this.fileService.getBaseStorageUrl();

    this.activatedRoute.params.subscribe(async params => {
      this.currentPageNo = this.getCurrentPageNo(params);
      try {
        const data = await this.fetchProducts();
        this.products = this.mapProducts(data.products);
        this.totalProductCount = data.totalProductCount;
        this.totalPageCount = this.calculateTotalPages(this.totalProductCount);
        this.pageList = this.generatePageList(this.currentPageNo, this.totalPageCount);
      } catch (error) {
      }
    });
  }

  private getCurrentPageNo(params: any): number {
    return parseInt(params["pageNo"] ?? 1);
  }

  private async fetchProducts(): Promise<{ totalProductCount: number, products: List_Product[] }> {
    return await this.productService.read(this.currentPageNo - 1, this.pageSize,
      () => { },
      errorMessage => { }
    );
  }

  private mapProducts(products: List_Product[]): List_Product[] {
    return products.map(p => ({
      id: p.id,
      createdDate: p.createdDate,
      imagePath: p?.productImageFiles?.length ? p?.productImageFiles.find(p => p.showCase)?.path : "",
      name: p.name,
      price: p.price,
      stock: p.stock,
      updatedDate: p.updatedDate,
      productImageFiles: p.productImageFiles
    }));
  }

  private calculateTotalPages(totalProductCount: number): number {
    return Math.ceil(totalProductCount / this.pageSize);
  }

  private generatePageList(currentPageNo: number, totalPageCount: number): number[] {
    const pageList: number[] = [];

    if (currentPageNo - 3 <= 0) {
      for (let i = 1; i <= Math.min(7, totalPageCount); i++) {
        pageList.push(i);
      }
    } else if (currentPageNo + 3 >= totalPageCount) {
      for (let i = Math.max(totalPageCount - 6, 1); i <= totalPageCount; i++) {
        pageList.push(i);
      }
    } else {
      for (let i = currentPageNo - 3; i <= currentPageNo + 3; i++) {
        pageList.push(i);
      }
    }

    return pageList;
  }

   async addToBasket(product : List_Product) {
    this.showSpinner(SpinnerType.BallAtom);
    let _basketItem : CreateBasketItem = new CreateBasketItem();
    _basketItem.productId = product.id;
    _basketItem.quantity = 1;
    await this.basketService.add(_basketItem)
    this.hideSpinner(SpinnerType.BallAtom);
    this.customToastrService.message("Product added to cart","Informaton",{
      messageType : ToastrMessageType.Success,
      position : ToastrPosition.TopRight
    })
  }
}
