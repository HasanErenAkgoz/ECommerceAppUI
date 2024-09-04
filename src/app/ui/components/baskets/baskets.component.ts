import { BasketService } from './../../../services/common/models/basket.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';
import { Create_Order } from 'src/app/contracts/order/create-order';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
declare var $: any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css']
})
export class BasketsComponent extends BaseComponent implements OnInit {
basketItems : ListBasketItem[] = [];
  constructor(private router : Router,private toastrService : CustomToastrService,private orderService : OrderService,spinner: NgxSpinnerService,private basketService : BasketService) {
    super(spinner);
    
  }
  ngOnInit(): Promise<void> {
    return this.getAll();
  }

  async getAll() : Promise<void> {
    this.showSpinner(SpinnerType.BallAtom)
    this.basketItems = await this.basketService.getAll();
    this.hideSpinner(SpinnerType.BallAtom)
  }

  async removeBasketItem(basketItemId: string) {
    this.showSpinner(SpinnerType.BallAtom);
    await this.basketService.remove(basketItemId);
 
    var a = $("." + basketItemId)
    $("." + basketItemId).fadeOut(500, () => this.hideSpinner(SpinnerType.BallAtom));
  }

  async shoppingComplete() {
    this.showSpinner(SpinnerType.BallAtom);
    const order: Create_Order = new Create_Order();
    order.address = "Yenimahalle";
    order.description = "Bla bla bla...";
    debugger
    await this.orderService.create(order);
    this.hideSpinner(SpinnerType.BallAtom);
    this.toastrService.message("Order received!", "Order Created!", {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopRight
    })
    this.router.navigate(["/"]);
  }
}
