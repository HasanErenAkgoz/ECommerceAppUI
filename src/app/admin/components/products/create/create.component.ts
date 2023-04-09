import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/model/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  productForm: FormGroup

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
    if (this.productForm.validator) {
      this.productService.create(this.productForm.value, () => {
        this.alertifyService.message("Product Add Success", {
          messageType: MessageType.Success,
          position: Position.TopRight
        })
      }, errorMessage => {
          this.alertifyService.message(errorMessage,{
            messageType : MessageType.Error,
            position : Position.TopLeft
          })
      })
    }
  }




}


