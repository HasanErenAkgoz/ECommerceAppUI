import { NgModule } from "@angular/core";
import { FileUploadComponent } from "./file-upload.component";
import { CommonModule } from "@angular/common";
import { NgxFileDropModule } from "ngx-file-drop";
import { DialogModule } from "src/app/dialogs/dialog/dialog.module";




@NgModule({
  declarations: [FileUploadComponent],
  imports: [
    CommonModule,
    NgxFileDropModule,
    DialogModule
  ],
  exports : [
    FileUploadComponent
  ]
})
export class FileUploadModule { }
