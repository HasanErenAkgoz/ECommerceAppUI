import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/Product/Create_Product';
import { List_Product } from 'src/app/contracts/Product/List_Product';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $ : any
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['name', 'stock', 'price', 'createDate', 'updateDate','photo','update','delete'];
  dataSource: MatTableDataSource<List_Product> = null
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(spinner: NgxSpinnerService, private productService: ProductService,
    private alertifyService: AlertifyService,
    private dialogService : DialogService) {
    super(spinner);
  }

  ngOnInit() {
    this.getProducts();
  }

  async getProducts() {
    this.showSpinner(SpinnerType.BallAtom);
    const allProducts: { totalProductCount: number; products: List_Product[] } = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.BallAtom), errorMessage => this.alertifyService.message(errorMessage, {
      messageType: MessageType.Error,
      position: Position.TopRight
    }))
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = allProducts.totalProductCount;
  }

  async pageChanged() {
    await this.getProducts();
  }

  addProductImages(id : string){
      this.dialogService.openDialog({
        data : id,
        componentType : SelectProductImageDialogComponent,
        options : {
          width : "1400px",
        }
      })
  }

}
