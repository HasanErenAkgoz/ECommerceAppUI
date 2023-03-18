import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private alertifyService : AlertifyService) {
    
  }
  ngOnInit(): void {
  }

  messageShow(){
    this.alertifyService.message("Message Showing",{
      messageType : MessageType.Success,
      position : Position.BottomLeft
    });

  }

}
