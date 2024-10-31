import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDirListComponent } from './shared-dir-list.component';

describe('SharedDirListComponent', () => {
  let component: SharedDirListComponent;
  let fixture: ComponentFixture<SharedDirListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedDirListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedDirListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
