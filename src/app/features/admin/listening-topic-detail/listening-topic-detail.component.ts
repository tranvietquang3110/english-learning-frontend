import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ListeningService } from '../../../services/ListeningService';
import { Listening } from '../../../models/listening/listening.model';
import { ListeningRequest } from '../../../models/request/listening-request';
import { AudioPlayerComponent } from '../../../shared/audio-player/audio-player.component';
import { ListeningExerciseFormComponent } from '../listening-exercise-form/listening-exercise-form.component';

enum State {
  View,
  AddExercise,
}

@Component({
  selector: 'app-listening-topic-detail',
  standalone: true,
  imports: [CommonModule, AudioPlayerComponent, ListeningExerciseFormComponent],
  templateUrl: './listening-topic-detail.component.html',
  styleUrl: './listening-topic-detail.component.scss',
})
export class ListeningTopicDetailComponent implements OnInit {
  State = State;
  currentState = State.View;
  topicId = '';
  topicName = '';
  listenings: Listening[] = [];
  isLoading = true;
  isAddingExercise = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listeningService: ListeningService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.topicId = params.get('topicId') || '';
      this.loadListenings();
    });
  }

  loadListenings() {
    this.listeningService.getListeningsByTopic(this.topicId).subscribe({
      next: (data) => {
        this.topicName = data.name;
        this.listenings = data.listenings;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading listenings:', err);
        this.isLoading = false;
      },
    });
  }

  goBack() {
    this.router.navigate(['/admin/listening/manage']);
  }

  onViewListening(listening: Listening) {
    // Navigate to listening detail or open in modal
    console.log('View listening:', listening);
  }

  onEditListening(listening: Listening) {
    // Navigate to edit listening form
    console.log('Edit listening:', listening);
  }

  onDeleteListening(listening: Listening) {
    // Show confirmation dialog and delete
    if (confirm('Are you sure you want to delete this listening exercise?')) {
      console.log('Delete listening:', listening);
      // Implement delete functionality
    }
  }

  changeToAddExercise() {
    this.currentState = State.AddExercise;
  }

  changeToView() {
    this.currentState = State.View;
  }

  onAddExercises(data: {
    exercises: Partial<Listening>[];
    imageFiles: File[];
    audioFiles: File[];
  }) {
    // Prevent double call
    if (this.isAddingExercise) {
      console.log('Already adding exercises, ignoring duplicate call');
      return;
    }

    this.isAddingExercise = true;

    // Prepare exercises as ListeningRequest
    const listeningRequests: ListeningRequest[] = data.exercises.map(
      (exercise) => ({
        name: exercise.name || '',
        transcript: exercise.transcript || '',
        question: exercise.question || '',
        options: {
          a: exercise.options?.['A'] || exercise.options?.['a'] || '',
          b: exercise.options?.['B'] || exercise.options?.['b'] || '',
          c: exercise.options?.['C'] || exercise.options?.['c'] || '',
          d: exercise.options?.['D'] || exercise.options?.['d'] || '',
        },
        correctAnswer: exercise.correctAnswer || '',
      })
    );

    this.listeningService
      .addListeningList(
        this.topicId,
        listeningRequests,
        data.imageFiles,
        data.audioFiles
      )
      .subscribe({
        next: (response: Listening[]) => {
          console.log('Exercises added successfully:', response);
          // Reload the listenings list
          this.loadListenings();
          this.changeToView();
          this.isAddingExercise = false;
        },
        error: (err) => {
          console.error('Error adding exercises:', err);
          this.isAddingExercise = false;
          // Show error message to user
          alert('Error adding exercises. Please try again.');
        },
      });
  }

  onCancelAddExercise() {
    this.changeToView();
  }
}
