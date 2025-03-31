import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptydialogComponent } from './emptydialog.component';

describe('EmptydialogComponent', () => {
  let component: EmptydialogComponent;
  let fixture: ComponentFixture<EmptydialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptydialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptydialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
