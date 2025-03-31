import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BcModalComponent } from './bc-modal.component';

describe('BcModalComponent', () => {
  let component: BcModalComponent;
  let fixture: ComponentFixture<BcModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BcModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BcModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
