import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranserPreviewComponent } from './transer-preview.component';

describe('TranserPreviewComponent', () => {
  let component: TranserPreviewComponent;
  let fixture: ComponentFixture<TranserPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranserPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranserPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
