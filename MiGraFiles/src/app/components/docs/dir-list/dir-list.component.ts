import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {Doc} from '../../../entities/doc';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DocType} from '../../../shared/doc-type';
import {LocalVariableNames} from '../../../shared/local-variable-names';
import {LocalService} from '../../../services/local.service';
import {error} from '@angular/compiler-cli/src/transformers/util';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-dir-list',
  templateUrl: './dir-list.component.html',
  styleUrl: './dir-list.component.css'
})
export class DirListComponent {
  @Input() docs : Doc[] = []
  @Input() localPath : string = '';
  back:string[] = [];
  @ViewChild('nuevoDoc') textModal!: TemplateRef<any>;
  @ViewChild('nuevaImagen') imageModal!: TemplateRef<any>;
  @ViewChild('nuevoDir') dirModal!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  textForm! : FormGroup;
  imageForm! : FormGroup;
  dirForm! : FormGroup;
  stringImage! : string;

  constructor(private router : Router,
              protected dialog:MatDialog,
              private fb: FormBuilder,
              private localS:LocalService,
              private route: ActivatedRoute) {

  }

  goBack(){
    this.back = this.localPath.split('/');
    this.back.pop();
    this.localPath = this.back[0];
    for (let i = 1; i < this.back.length; i++) {
      this.localPath += "/"+this.back[i];
    }
    this.router.routeReuseStrategy.shouldReuseRoute = function (){
      return false;
    }
    this.router.navigate(['/empleado/local/',this.localPath]);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  openTextModal(){
    this.textForm = this.fb.group({
      title: [null, [Validators.required, Validators.maxLength(60), Validators.pattern("^[a-zA-Z0-9_-]+")]],
      content: [null,[Validators.required]],
      extension: [null,[Validators.required]],
      url: [this.localPath, [Validators.required]],
      type: [DocType.DOC, [Validators.required]],
      author: [localStorage.getItem(LocalVariableNames.LOCAL_USER),[Validators.required]]
    })
    this.dialogRef = this.dialog.open(this.textModal);
  }

  openImageModal(){
    this.imageForm = this.fb.group({
      title: [null, [Validators.required, Validators.maxLength(60), Validators.pattern("^[a-zA-Z0-9_-]+")]],
      extension: [null,[Validators.required]],
      image: [null],
      url: [this.localPath, [Validators.required]],
      type: [DocType.DOC, [Validators.required]],
      author: [localStorage.getItem(LocalVariableNames.LOCAL_USER),[Validators.required]]
    })
    this.dialogRef = this.dialog.open(this.imageModal);
  }

  openDirModal(){
    const strEmpty : string[]  = [];
    this.dirForm = this.fb.group({
      title: [null, [Validators.required, Validators.maxLength(60), Validators.pattern("^[a-zA-Z0-9_-]+")]],
      url: [this.localPath, [Validators.required]],
      type: [DocType.DIR, [Validators.required]],
      author: [localStorage.getItem(LocalVariableNames.LOCAL_USER),[Validators.required]],
      paths: [strEmpty]
    })
    this.dialogRef = this.dialog.open(this.dirModal);
  }

  submitText(){
    if (this.textForm.valid){
      const docSaved : Doc = this.textForm.value;
      this.localS.pushTextDoc(docSaved).subscribe({
        next: (ok : string) =>{
          alert("Se guardo el archivo con exito.")
          this.onClose();
          this.router.routeReuseStrategy.shouldReuseRoute = function (){
            return false;
          }
          this.router.navigate(['empleado/local',this.localPath]);
        }, error: (err:HttpErrorResponse) => {
          alert(err.statusText+ " Hubo un error al insertar el archivo")
        }
      })
    } else {
      alert("El Archivo de texto no es valido.")
    }
  }

  submitDir(){
    if (this.dirForm.valid){
      const docSaved : Doc = this.dirForm.value;
      this.localS.pushDirDoc(docSaved).subscribe({
        next: (ok : string) =>{
          alert("Se guardo el folder con exito.")
          this.onClose();
          this.router.routeReuseStrategy.shouldReuseRoute = function (){
            return false;
          }
          this.router.navigate(['empleado/local',this.localPath]);
        }, error: (err:HttpErrorResponse) => {
          alert(err.statusText+ " Hubo un error al insertar el folder")
        }
      })
    } else {
      alert("El Folder no ha sido creado.")
    }
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

  submitImage(){
    if (this.imageForm.valid){
      const docSaved : Doc = this.imageForm.value;
      docSaved.image = this.stringImage;
      this.localS.pushImageDoc(docSaved).subscribe({
        next: (ok : string) =>{
          alert("Se guardo la imagen con exito.")
          this.onClose();
          this.router.routeReuseStrategy.shouldReuseRoute = function (){
            return false;
          }
          this.router.navigate(['empleado/local',this.localPath]);
        }, error: (err:HttpErrorResponse) => {
          alert(err.statusText+ " Hubo un error al insertar el folder")
        }
      })
    } else {
      alert("La imagen no ha sido creada.")
    }
  }
}
