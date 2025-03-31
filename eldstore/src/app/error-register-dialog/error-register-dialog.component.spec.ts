import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorRegisterDialogComponent } from './error-register-dialog.component';

describe('ErrorRegisterDialogComponent', () => {
  let component: ErrorRegisterDialogComponent;
  let fixture: ComponentFixture<ErrorRegisterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorRegisterDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorRegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
