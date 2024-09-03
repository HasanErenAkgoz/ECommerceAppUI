import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


export class BaseComponent {
  constructor(private spinner : NgxSpinnerService) {}

  showSpinner(spinnerNameType : SpinnerType){
    setTimeout(()=> this.hideSpinner(spinnerNameType), 3000)
  }
  hideSpinner(spinnerNameType : SpinnerType){

  }
}


export enum SpinnerType {
  BallScaleMultiple = "ball-scale-multiple",
  BallAtom = "ball-atom",
  BallClipRotatePulse = "ball-clip-rotate-pulse",
  SquareJellyBox = "square-jelly-box"
}