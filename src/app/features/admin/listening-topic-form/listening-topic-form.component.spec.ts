import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListeningTopicFormComponent } from './listening-topic-form.component';

describe('ListeningTopicFormComponent', () => {
  let component: ListeningTopicFormComponent;
  let fixture: ComponentFixture<ListeningTopicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeningTopicFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeningTopicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
