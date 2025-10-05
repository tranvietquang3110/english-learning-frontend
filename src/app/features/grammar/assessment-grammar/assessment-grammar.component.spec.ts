import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentGrammarComponent } from './assessment-grammar.component';

describe('AssessmentGrammarComponent', () => {
  let component: AssessmentGrammarComponent;
  let fixture: ComponentFixture<AssessmentGrammarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentGrammarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentGrammarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
