import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFileSpanComponent } from './shared-file-span.component';

describe('SharedFileSpanComponent', () => {
  let component: SharedFileSpanComponent;
  let fixture: ComponentFixture<SharedFileSpanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedFileSpanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedFileSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
