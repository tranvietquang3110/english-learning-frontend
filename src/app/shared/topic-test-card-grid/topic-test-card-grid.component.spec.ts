import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicTestCardGridComponent } from './topic-test-card-grid.component';

describe('TopicTestCardComponent', () => {
  let component: TopicTestCardGridComponent;
  let fixture: ComponentFixture<TopicTestCardGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicTestCardGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicTestCardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
