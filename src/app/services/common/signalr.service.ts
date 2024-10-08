import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

constructor(@Inject("baseSignalRUrl") private baseSignalRUrl : string) { }

private _conection : HubConnection
get connection(): HubConnection{
  return this._conection;
}
start(hubUrl : string){
  hubUrl += this.baseSignalRUrl + hubUrl;
  if (!this.connection || this._conection?.state == HubConnectionState.Disconnected) {
      
    const builder : HubConnectionBuilder = new HubConnectionBuilder();
    const hubConnection : HubConnection = builder.withUrl(hubUrl).withAutomaticReconnect().build();

    hubConnection.start().then(() => console.log("Connected")).catch(error => setTimeout(() => 
      this.start(hubUrl), 2000))
      this._conection = hubConnection 
  }

  this.connection.onreconnected(connectionId => console.log("Reconnected"));
  this._conection.onreconnecting(error => console.log("Reconnecting"));
  this._conection.onclose(error => console.log("Close Reconnection"));
}

invoke(procedureName : string , message : any,successCallBack? : (value) => void, errorCallBack? : (error) => void){
  this.connection.invoke(procedureName,message).then(successCallBack).catch(errorCallBack);
}
on(procedureName : string, callBack : (...message : any) => void){
  this.connection.on(procedureName,callBack);
}
}
