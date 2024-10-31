import {Component, Input} from '@angular/core';
import {Doc} from '../../../entities/doc';
import {SharedDoc} from '../../../entities/shared-doc';

@Component({
  selector: 'app-shared-dir-list',
  templateUrl: './shared-dir-list.component.html',
  styleUrl: './shared-dir-list.component.css'
})
export class SharedDirListComponent {
  @Input() docs : SharedDoc[] = []



}
