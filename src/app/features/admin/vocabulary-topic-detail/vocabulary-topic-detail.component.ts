import { Component, OnInit } from '@angular/core';
import { AdminVocabItemComponent } from '../admin-vocab-item/admin-vocab-item.component';
import { VocabularyService } from '../../../services/VocabularyService';
import { ActivatedRoute } from '@angular/router';
import { Vocabulary } from '../../../models/vocabulary/vocabulary.model';
import { CommonModule } from '@angular/common';
import { VocabEditComponent } from '../vocab-edit/vocab-edit.component';

enum State {
  View,
  Edit,
  Create,
}

@Component({
  selector: 'app-vocabulary-topic-detail',
  standalone: true,
  imports: [AdminVocabItemComponent, CommonModule, VocabEditComponent],
  templateUrl: './vocabulary-topic-detail.component.html',
  styleUrl: './vocabulary-topic-detail.component.scss',
})
export class VocabularyTopicDetailComponent implements OnInit {
  vocabList: Vocabulary[] = [];
  name: string = '';
  State = State;
  currentState: State = State.View;
  vocabToEdit!: Vocabulary;
  topicId: string | null = '';
  constructor(
    private vocabService: VocabularyService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    console.log('VocabularyTopicDetailComponent initialized');
    this.topicId = this.route.snapshot.paramMap.get('topicId');
    if (this.topicId) {
      this.loadVocabularies(this.topicId);
    }
  }
  loadVocabularies(topicId: string) {
    this.vocabService.getVocabulariesByTopicId(topicId).subscribe({
      next: (data) => {
        console.log('Loaded vocabularies for topic:', data);
        this.vocabList = data.vocabularies;
        this.name = data.name;
      },
      error: (err) => {
        console.error('Error loading vocabularies:', err);
      },
    });
  }

  handleEdit(vocab: Vocabulary) {
    console.log('Edit vocabulary:', vocab);
    // Implement edit functionality here
  }

  handleDelete(vocabId: string) {
    console.log('Delete vocabulary with ID:', vocabId);

    // Implement delete functionality here
  }

  changeToEdit(vocab: Vocabulary) {
    this.currentState = State.Edit;
    this.vocabToEdit = vocab;
  }

  changeToCreate() {
    this.currentState = State.Create;
    this.vocabToEdit = {} as Vocabulary;
  }

  backToView() {
    this.currentState = State.View;
    this.vocabToEdit = {} as Vocabulary;
  }

  handleCancel() {
    this.backToView();
    this.vocabToEdit = {} as Vocabulary;
  }

  handleCreate(vocabToCreate: Vocabulary) {
    if (this.topicId) {
      console.log(vocabToCreate);
      const audios: File[] = [];
      const images: File[] = [];
      const vocabs: Vocabulary[] = [];
      audios.push(vocabToCreate.audioUrl as any);
      images.push(vocabToCreate.imageUrl as any);
      vocabs.push(vocabToCreate);
      this.vocabService
        .addVocabularies(this.topicId, vocabs, images, audios)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.vocabList = this.vocabList.concat(res);
            this.backToView();
          },
          error: (err) => {
            console.log(err);
          },
        });
      console.log(vocabToCreate);
    }
  }
}
