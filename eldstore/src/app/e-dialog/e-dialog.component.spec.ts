import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EDialogComponent } from './e-dialog.component';

describe('EDialogComponent', () => {
  let component: EDialogComponent;
  let fixture: ComponentFixture<EDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
