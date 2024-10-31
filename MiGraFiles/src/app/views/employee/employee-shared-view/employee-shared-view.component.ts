import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Doc} from '../../../entities/doc';
import {SharedService} from '../../../services/shared.service';
import {LocalVariableNames} from '../../../shared/local-variable-names';
import {SharedDoc} from '../../../entities/shared-doc';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-employee-shared-view',
  templateUrl: './employee-shared-view.component.html',
  styleUrl: './employee-shared-view.component.css'
})
export class EmployeeSharedViewComponent implements OnInit{
  docs : SharedDoc[] = [];


  constructor(private sharedS: SharedService,
              ) {

  }

  ngOnInit() {
    this.sharedS.getSharedDocs(localStorage.getItem(LocalVariableNames.LOCAL_USER)??'').subscribe({
      next: (docs: SharedDoc[])=>{
        this.docs = docs;
    }, error:(err:HttpErrorResponse)=>{
        alert("No se encontraron archivos");
    }
    })
  }
}

