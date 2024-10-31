import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirListComponent } from './dir-list.component';

describe('DirListComponent', () => {
  let component: DirListComponent;
  let fixture: ComponentFixture<DirListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
