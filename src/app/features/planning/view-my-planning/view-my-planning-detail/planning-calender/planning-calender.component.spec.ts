import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningCalenderComponent } from './planning-calender.component';

describe('PlanningCalenderComponent', () => {
  let component: PlanningCalenderComponent;
  let fixture: ComponentFixture<PlanningCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanningCalenderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanningCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
