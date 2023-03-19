import { Component, OnInit } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ECommerceAppUI';
  constructor(private toastrService: CustomToastrService) {}
  ngOnInit(): void {
    this.toastrService.message("Merhaba","Eren",{
      messageType : ToastrMessageType.Success,
      position : ToastrPosition.TopRight,
    })
  }
}

