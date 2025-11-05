import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyPlanningDetailComponent } from './view-my-planning-detail.component';

describe('ViewMyPlanningDetailComponent', () => {
  let component: ViewMyPlanningDetailComponent;
  let fixture: ComponentFixture<ViewMyPlanningDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMyPlanningDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewMyPlanningDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
