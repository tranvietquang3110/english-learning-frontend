import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeningPracticeComponent } from './listening-practice.component';

describe('ListeningPracticeComponent', () => {
  let component: ListeningPracticeComponent;
  let fixture: ComponentFixture<ListeningPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeningPracticeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeningPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
