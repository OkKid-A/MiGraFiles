import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {Doc} from '../../../entities/doc';
import {SharedDoc} from '../../../entities/shared-doc';
import {Validators} from '@angular/forms';
import {DocType} from '../../../shared/doc-type';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-shared-file-span',
  templateUrl: './shared-file-span.component.html',
  styleUrl: './shared-file-span.component.css'
})
export class SharedFileSpanComponent {
  @Input() doc! : SharedDoc;
  @ViewChild('textTemplate') textModal!: TemplateRef<any>;
  @ViewChild('imageTemplate') imageModal!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  constructor(protected dialog:MatDialog) {
  }

  onClick(){
    if (this.doc.type === DocType.DOC){
      if (this.doc.extension==="jpg"||this.doc.extension==="png"){
        this.dialogRef = this.dialog.open(this.imageModal);
      } else if (this.doc.extension === "txt"||this.doc.extension==="html"){
        this.dialogRef = this.dialog.open(this.textModal);
      }
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  protected readonly DocType = DocType;
}
