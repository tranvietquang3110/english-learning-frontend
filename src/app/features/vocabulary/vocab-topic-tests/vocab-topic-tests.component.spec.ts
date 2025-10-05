import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabTopicTestsComponent } from './vocab-topic-tests.component';

describe('VocabTopicTestsComponent', () => {
  let component: VocabTopicTestsComponent;
  let fixture: ComponentFixture<VocabTopicTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocabTopicTestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VocabTopicTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
