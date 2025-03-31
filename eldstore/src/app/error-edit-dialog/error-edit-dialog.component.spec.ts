import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorEditDialogComponent } from './error-edit-dialog.component';

describe('ErrorEditDialogComponent', () => {
  let component: ErrorEditDialogComponent;
  let fixture: ComponentFixture<ErrorEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
