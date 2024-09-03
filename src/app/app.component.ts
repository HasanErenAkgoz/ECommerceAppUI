import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Route, Router } from '@angular/router';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { DynamicLoadComponentService, ComponentType } from './services/common/dynamic-load-component.service';
declare var $: any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ECommerceAppUI';
  @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamicLoadComponentDirective: DynamicLoadComponentDirective;
  constructor(private dynamicLoadComponentService: DynamicLoadComponentService,public authService : AuthService,private customToastrService : CustomToastrService,private router:Router) {authService.identityCheck()}

  ngOnInit(): void {
  }

  signOut(){
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      this.router.navigate(["login"])
      this.authService.identityCheck();
      this.customToastrService.message("Logged Out","Exit",{
        messageType : ToastrMessageType.Warning,
        position : ToastrPosition.TopRight
      })
  }


  loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent, this.dynamicLoadComponentDirective.viewContainerRef);
  }
}

