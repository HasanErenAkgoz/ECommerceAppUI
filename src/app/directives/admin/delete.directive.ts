import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
declare var $ : any
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  @Input() id : string;
  @Input() controller : string;
  @Output() callback : EventEmitter<any> = new EventEmitter()
  constructor(private element: ElementRef, private _renderer: Renderer2, private httpClientService: HttpClientService,
    private dialog : MatDialog , private alertifyService : AlertifyService,
    private dialogService : DialogService) {
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

    this.dialogService.openDialog({
      componentType : DeleteDialogComponent,
      data : DeleteState.Yes,
      afterClosed: () => {
        const td: HTMLTableCellElement = this.element.nativeElement
        this.httpClientService.detele({
          controller: this.controller,
        }, this.id).subscribe(data => {
          $(td.parentElement).fadeOut(800, () => {
            this.callback.emit();
            this.alertifyService.message("Ürün Başarıyla Silinmiştir.", {
              messageType: MessageType.Success,
              position: Position.TopRight
            })
          });
        });
      }
    })
  }

  openDeleteDialog(afterClosed : any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width : '250px',
      data: DeleteState.Yes
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result == DeleteState.Yes) {
        afterClosed();
      }
    });
  }
}
