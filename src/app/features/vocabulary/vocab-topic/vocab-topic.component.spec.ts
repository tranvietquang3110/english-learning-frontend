import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabTopicComponent } from './vocab-topic.component';

describe('VocabTopicComponent', () => {
  let component: VocabTopicComponent;
  let fixture: ComponentFixture<VocabTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocabTopicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VocabTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
