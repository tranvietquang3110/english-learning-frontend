import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyTopicDetailComponent } from './vocabulary-topic-detail.component';

describe('VocabularyTopicDetailComponent', () => {
  let component: VocabularyTopicDetailComponent;
  let fixture: ComponentFixture<VocabularyTopicDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocabularyTopicDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VocabularyTopicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
