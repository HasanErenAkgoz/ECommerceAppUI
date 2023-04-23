import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { ProductService } from 'src/app/services/common/model/product.service';
declare var $ : any
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  @Input() id : string;
  @Output() callback : EventEmitter<any> = new EventEmitter()
  constructor(private element: ElementRef, private _renderer: Renderer2, private productService: ProductService) {
    const icon = this._renderer.createElement("i");
    const matIcon = this._renderer.createElement("mat-icon");
    const text = this._renderer.createText("delete_forever");
    
    // Element ayarlarını yapma
    this._renderer.setAttribute(icon, "id", "deleteicon");
    this._renderer.setStyle(icon, 'cursor', 'pointer');
    this._renderer.setStyle(icon, 'color', 'red');
    this._renderer.addClass(matIcon, 'mat-icon');
    this._renderer.addClass(matIcon, 'notranslate');
    this._renderer.addClass(matIcon, 'material-icons');
    this._renderer.addClass(matIcon, 'mat-ligature-font');
    this._renderer.addClass(matIcon, 'mat-icon-no-color');
  
    // Elemanları birbirine ekleme
    this._renderer.appendChild(matIcon, text);
    this._renderer.appendChild(icon, matIcon);
    this._renderer.appendChild(this.element.nativeElement, icon);
  }

  @HostListener("click")
  async onClick() {
    console.log(this.id)
    const td: HTMLTableCellElement = this.element.nativeElement
    await this.productService.delete(this.id)
    $(td.parentElement).fadeOut(800, () =>{
     this.callback.emit();
    })
  }
}
