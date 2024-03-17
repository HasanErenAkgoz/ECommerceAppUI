import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { HubUrls } from 'src/app/constants/hub-urls.enum';
import { ReciveFunctions } from 'src/app/constants/recive-functions';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { SignalrService } from 'src/app/services/common/signalr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent  implements OnInit {

  constructor(private alertifyService : AlertifyService,  spinner : NgxSpinnerService, private signalrService : SignalrService) {
    super(spinner);
    signalrService.start(HubUrls.ProductHub);
  }
  ngOnInit(): void {
    this.signalrService.on(ReciveFunctions.ProductAddedMessageReciveFunction,message =>{
      alert(message);
    });
  }

  messageShow(){
    this.alertifyService.message("Message Showing",{
      messageType : MessageType.Success,
      position : Position.BottomLeft
    });

  }

}
