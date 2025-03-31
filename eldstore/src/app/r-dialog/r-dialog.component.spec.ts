import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RDialogComponent } from './r-dialog.component';

describe('RDialogComponent', () => {
  let component: RDialogComponent;
  let fixture: ComponentFixture<RDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
