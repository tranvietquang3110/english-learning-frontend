import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabTopicFormComponent } from './vocab-topic-form.component';

describe('VocabTopicFormComponent', () => {
  let component: VocabTopicFormComponent;
  let fixture: ComponentFixture<VocabTopicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocabTopicFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VocabTopicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
