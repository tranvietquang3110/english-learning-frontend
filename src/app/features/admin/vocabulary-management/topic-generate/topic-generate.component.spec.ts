import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicGenerateComponent } from './topic-generate.component';

describe('TopicGenerateComponent', () => {
  let component: TopicGenerateComponent;
  let fixture: ComponentFixture<TopicGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicGenerateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopicGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
