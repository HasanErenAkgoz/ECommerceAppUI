import { Inject,Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient : HttpClient, @Inject("baseUrl") private baseUrl : string) { }

  private url(requestParameters : Partial<RequestParameters>){

    return `${requestParameters.baseUrl ? requestParameters.baseUrl : this.baseUrl}/${requestParameters.controller}${requestParameters.action ? `/${requestParameters.action}` : ""}`;

  }
  get<T>(requestParameters : Partial<RequestParameters>, id? : string ) : Observable<T>{ 

    let url : string = "";
    requestParameters.fullEndPoint ? url = requestParameters.fullEndPoint : url = `${this.url(requestParameters)}${id ? `/${id}` : "" }`
    return this.httpClient.get<T>(url,{headers : requestParameters.headers})
  }

  post<T>(requestParameters : Partial<RequestParameters>, body : Partial<T>) : Observable<T>{

    let url = "";
    requestParameters.fullEndPoint ? url = requestParameters.fullEndPoint : url = `${this.url(requestParameters)}`
    return this.httpClient.post<T>(url,body, {headers : requestParameters.headers});
  }

  put<T>(requestParameters : Partial<RequestParameters>, body : Partial<T>) : Observable<T>{
    let url = "";
    requestParameters.fullEndPoint ? url = requestParameters.fullEndPoint : url = `${this.url(requestParameters)}`
    return this.httpClient.put<T>(url,body, {headers : requestParameters.headers});
  }

  detele<T>(requestParameters : Partial<RequestParameters>, id : string) : Observable<T>{
    let url = "";
    requestParameters.fullEndPoint ? url = requestParameters.fullEndPoint : url = `${this.url(requestParameters)}/${id}`
    return this.httpClient.delete<T>(url,{headers : requestParameters.headers})
  }
}

export class RequestParameters{
  controller? : string;
  action? : string;
  baseUrl? : string;
  fullEndPoint? : string;
  headers? : HttpHeaders
}