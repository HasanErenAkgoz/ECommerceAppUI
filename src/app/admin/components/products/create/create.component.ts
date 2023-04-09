import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/common/model/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  productForm : FormGroup

  constructor(private productService : ProductService , private formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
    this.loadProductFormGroup();
  }
  
  loadProductFormGroup(){
    this.productForm = this.formBuilder.group({
       name : ["",Validators.required],
       stock : ["",Validators.required],
       price : ["",Validators.required],

    })
  }

  create(){
    this.productService.create(this.productForm.value)
  }

  


}


