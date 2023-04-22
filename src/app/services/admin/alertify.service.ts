import { Injectable } from '@angular/core';
declare var alertify : any;

@Injectable({
  providedIn: 'root'
})

export class AlertifyService {

  constructor() { }

  message(message :string,options : Partial<AlertifyOptions>){
    alertify.set('notifier','position',options.position)
    alertify[options.messageType](message)
  }
}

export class AlertifyOptions{
  messageType: MessageType = MessageType.Success
  position : Position = Position.BottomLeft;
}

export enum MessageType {
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}

export enum Position{
  TopCenter = 'top-center',
  TopRight = 'top-right',
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left",
  BottomCenter = "bottom-center",
}
