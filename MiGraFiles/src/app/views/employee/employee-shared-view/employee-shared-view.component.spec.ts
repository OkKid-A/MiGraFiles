import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSharedViewComponent } from './employee-shared-view.component';

describe('EmployeeSharedViewComponent', () => {
  let component: EmployeeSharedViewComponent;
  let fixture: ComponentFixture<EmployeeSharedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeSharedViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeSharedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
