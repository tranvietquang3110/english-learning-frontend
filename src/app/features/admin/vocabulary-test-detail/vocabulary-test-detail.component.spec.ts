import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyTestDetailComponent } from './vocabulary-test-detail.component';

describe('VocabularyTestDetailComponent', () => {
  let component: VocabularyTestDetailComponent;
  let fixture: ComponentFixture<VocabularyTestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocabularyTestDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VocabularyTestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
