import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveMainComponent } from './move-main.component';

describe('MoveMainComponent', () => {
  let component: MoveMainComponent;
  let fixture: ComponentFixture<MoveMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoveMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoveMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
