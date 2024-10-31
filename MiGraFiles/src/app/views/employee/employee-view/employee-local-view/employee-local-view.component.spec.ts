import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLocalViewComponent } from './employee-local-view.component';

describe('EmployeeLocalViewComponent', () => {
  let component: EmployeeLocalViewComponent;
  let fixture: ComponentFixture<EmployeeLocalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeLocalViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeLocalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
