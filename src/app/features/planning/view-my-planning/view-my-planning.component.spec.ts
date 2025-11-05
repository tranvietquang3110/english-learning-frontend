import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyPlanningComponent } from './view-my-planning.component';

describe('ViewMyPlanningComponent', () => {
  let component: ViewMyPlanningComponent;
  let fixture: ComponentFixture<ViewMyPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMyPlanningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewMyPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
