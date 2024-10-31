import {Component, OnInit} from '@angular/core';
import {Doc} from '../../../../entities/doc';
import {DocService} from '../../../../services/doc.service';
import {error} from '@angular/compiler-cli/src/transformers/util';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-employee-local-view',
  templateUrl: './employee-local-view.component.html',
  styleUrl: './employee-local-view.component.css'
})
export class EmployeeLocalViewComponent implements OnInit{

  localPath! : string;
  previousPath!:string;
  docs : Doc[] = [];

  constructor(private docS : DocService,
              private route:ActivatedRoute,
              private router: Router) {
    this.route.paramMap.subscribe((params)=>{
      if (params){
        this.localPath = params.get('url')??'raiz';
      }
    })
  }

  ngOnInit() {
    this.docS.findDocsByPath(this.localPath).subscribe({
      next:(found : Doc[])=>{
        this.docs = found;
    },
      error: (err:any)=>{
        alert("No se han encontrado documentos");
        console.log(err);
    }

    })
  }
}
