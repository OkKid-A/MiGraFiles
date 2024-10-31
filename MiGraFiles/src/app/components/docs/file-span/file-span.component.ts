import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Doc} from '../../../entities/doc';
import {DocService} from '../../../services/doc.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DocType} from '../../../shared/doc-type';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalVariableNames} from '../../../shared/local-variable-names';
import {HttpErrorResponse} from '@angular/common/http';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-file-span',
  templateUrl: './file-span.component.html',
  styleUrl: './file-span.component.css'
})
export class FileSpanComponent{
  @Input() doc! : Doc;
  @ViewChild('textTemplate') textModal!: TemplateRef<any>;
  @ViewChild('imageTemplate') imageModal!: TemplateRef<any>;
  @ViewChild('nuevaImagen') editModal! : TemplateRef<any>;
  @ViewChild('shareTemplate') shareModal! : TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  dialogRefShare!: MatDialogRef<any>;
  saveForm!: FormGroup;
  imageForm!:FormGroup;
  shareForm!: FormGroup;
  stringImage:string = '';

  constructor(private docS : DocService,
              private sharedS: SharedService,
              private router: Router,
              protected dialog:MatDialog,
              private route: ActivatedRoute,
              private fB: FormBuilder,
              protected shareDialog:MatDialog) {
  }

  onClick(){
    if (this.doc.type === DocType.DIR){
      this.router.routeReuseStrategy.shouldReuseRoute = function (){
        return false;
      }
      this.router.navigate(['empleado/local/',this.doc.url]);
    } else if (this.doc.type === DocType.DOC){
      if (this.doc.extension==="jpg"||this.doc.extension==="png"){
        this.dialogRef = this.dialog.open(this.imageModal);
      } else if (this.doc.extension === "txt"||this.doc.extension==="html"){
        this.saveForm = this.fB.group({
          content: [this.doc.content, [Validators.required]]
        })
        this.dialogRef = this.dialog.open(this.textModal);
      }
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  saveChanges(){
    if (this.saveForm.valid){
      this.doc.content = this.saveForm.value.content;
      this.docS.updateDocContent(this.doc).subscribe({
        next: (saved : string) =>{
          alert("Se actualizo el documento.");
          this.onClose();
          this.router.routeReuseStrategy.shouldReuseRoute = function (){
            return false;
          }
          this.router.navigate(['empleado/local',this.goBack()]);
        }
      })
    }
  }

  goBack():string{
    const back = this.doc.url.split('/');
    let localPath = back[0];
    console.log(back.length)
    for (let i = 1; i < back.length-1; i++) {
      localPath += "/"+back[i];
    }
    console.log(this.doc.url)
    console.log(localPath);
    return localPath
  }

  editImage(){
    this.imageForm = this.fB.group({
      image: [this.doc.image]
    })
    this.onClose();
    this.dialogRef = this.dialog.open(this.editModal);
  }

  submitImage(){
    if (this.imageForm.valid){
      this.docS.updateDocImage(this.stringImage,this.doc.author,this.doc.url).subscribe({
        next: (caught : string)=>{
          alert("Se actualizo la imagen con exito.");
          this.onClose();
          this.router.routeReuseStrategy.shouldReuseRoute = function (){
            return false;
          }
          this.router.navigate(['empleado/local',this.goBack()]);
        }, error: (err:HttpErrorResponse) => {
          alert(err.statusText+ " Hubo un error al insertar el folder")
        }
      })
    }
  }

  eliminar(event : Event){
    event.stopPropagation();
    this.docS.deactivateDoc(this.doc.author,this.doc.url, this.doc.type).subscribe({
      next: (caught : string)=>{
        alert("Se ha eliminado el archivo/directorio con exito");
        this.router.routeReuseStrategy.shouldReuseRoute = function (){
          return false;
        }
        this.router.navigate(['empleado/local',this.goBack()]);
    }, error: (err:HttpErrorResponse) => {
        alert(err.statusText+ " No se pudo eliminar el archivo/directorio.")
      }
    })
  }

  copiar(event: Event){
    event.stopPropagation();
    this.docS.copiarDoc(this.doc.author, this.doc.url, this.doc.type, this.doc.title).subscribe({
      next: (caught : string)=>{
        alert("Se ha copiado el archivo/directorio con exito");
        this.router.routeReuseStrategy.shouldReuseRoute = function (){
          return false;
        }
        this.router.navigate(['empleado/local',this.goBack()]);
      }, error: (err:HttpErrorResponse) => {
        alert(err.statusText+ " No se pudo copiado el archivo/directorio.")
      }
    })
  }

  compartir(event:Event){
    event.stopPropagation();
    this.shareForm = this.fB.group({
      shareholder: [null, [Validators.required, Validators.maxLength(30)]]
    });
    this.dialogRefShare = this.shareDialog.open(this.shareModal);
  }

  closeShare(){
    this.dialogRefShare.close();
  }

  submitShareholder(){
    if (this.shareForm.valid){
      this.sharedS.checkUser(this.shareForm.value.shareholder).subscribe({
        next:(found:string)=>{
          const sentDoc = {
            _id: this.doc._id,
            title: this.doc.title,
            content: this.doc.content,
            extension: this.doc.extension,
            author: this.doc.author,
            type: this.doc.type,
            url: "shared",
            image: this.doc.image,
            active: true,
            shareholder: this.shareForm.value.shareholder,
            dateShared: (new Date).toISOString(),
            paths: []
          }
          this.sharedS.pushSharedDoc(sentDoc).subscribe({
            next:(found:string)=>{
              alert("Se ha compartido el archivo con exito");
            },
            error: (err: HttpErrorResponse) =>{
              alert("Hubo un error al intentar compartir el archivo")
            }
          })
        },
        error: (err: HttpErrorResponse) =>{
          alert("Ese nombre de usuario no existe.")
        }
      });
    } else {
      alert("Username invalido");
    }
    this.closeShare();
  }

  onFileSelected(event:any){
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.stringImage = (reader.result as string);
        console.log(this.imageForm.value.image);
      };

      reader.onerror = (error) => {
        console.error('Error: ', error);
      };
    }
  }

  protected readonly DocType = DocType;
}
