import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSpanComponent } from './file-span.component';

describe('FileSpanComponent', () => {
  let component: FileSpanComponent;
  let fixture: ComponentFixture<FileSpanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileSpanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
