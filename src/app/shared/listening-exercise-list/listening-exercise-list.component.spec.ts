import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeningExerciseListComponent } from './listening-exercise-list.component';

describe('ListeningExerciseListComponent', () => {
  let component: ListeningExerciseListComponent;
  let fixture: ComponentFixture<ListeningExerciseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeningExerciseListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeningExerciseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
