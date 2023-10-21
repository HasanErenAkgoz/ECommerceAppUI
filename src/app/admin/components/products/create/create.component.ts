import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Create_Product } from 'src/app/contracts/Create_Product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  productForm: FormGroup

  @Output() createProduct : EventEmitter<Create_Product> = new EventEmitter();
  @Output() fileUploadOptions : Partial<FileUploadOptions> = {
    action : "upload",
    controller : "products",
    explanation : "Drag or Select Images...",
    isAdminPage : true,
    accept : ".png, .jpg, .jpeg"
  }
  constructor(private productService: ProductService, private formBuilder: FormBuilder,
    private alertifyService: AlertifyService) {
  }

  ngOnInit(): void {
    this.loadProductFormGroup();
  }

  loadProductFormGroup() {
    this.productForm = this.formBuilder.group({
      name: ["", Validators.required],
      stock: ["", Validators.required],
      price: ["", Validators.required],

    })
  }

  create() {
      this.productService.create(this.productForm.value, () => {
        this.alertifyService.message("Product Add Success", {
          messageType: MessageType.Success,
          position: Position.TopRight
        })
        this.createProduct.emit(this.productForm.value);
      }, errorMessage => {
          this.alertifyService.message(errorMessage,{
            messageType : MessageType.Error,
            position : Position.TopRight
          })
      })
  }
}


