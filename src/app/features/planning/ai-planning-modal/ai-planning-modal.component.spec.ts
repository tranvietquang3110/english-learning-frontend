import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiPlanningModalComponent } from './ai-planning-modal.component';

describe('AiPlanningModalComponent', () => {
  let component: AiPlanningModalComponent;
  let fixture: ComponentFixture<AiPlanningModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiPlanningModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AiPlanningModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
