import { BasketService } from './../../../services/common/models/basket.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';
declare var $: any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css']
})
export class BasketsComponent extends BaseComponent implements OnInit {
basketItems : ListBasketItem[] = [];
  constructor(spinner: NgxSpinnerService,private basketService : BasketService) {
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

}
