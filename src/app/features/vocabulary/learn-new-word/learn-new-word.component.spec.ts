import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnNewWordComponent } from './learn-new-word.component';

describe('LearnNewWordComponent', () => {
  let component: LearnNewWordComponent;
  let fixture: ComponentFixture<LearnNewWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnNewWordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnNewWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
