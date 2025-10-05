import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListeningExerciseFormComponent } from './listening-exercise-form.component';

describe('ListeningExerciseFormComponent', () => {
  let component: ListeningExerciseFormComponent;
  let fixture: ComponentFixture<ListeningExerciseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeningExerciseFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeningExerciseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
