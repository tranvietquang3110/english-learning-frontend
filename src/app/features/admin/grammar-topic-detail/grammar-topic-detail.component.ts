import { Component, OnInit } from '@angular/core';
import { GrammarService } from '../../../services/GrammarService';
import { ActivatedRoute } from '@angular/router';
import { Grammar } from '../../../models/grammar/grammar.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

enum State {
  View,
  Edit,
  Create,
  Detail,
}

@Component({
  selector: 'app-grammar-topic-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grammar-topic-detail.component.html',
  styleUrl: './grammar-topic-detail.component.scss',
})
export class GrammarTopicDetailComponent implements OnInit {
  grammarList: Grammar[] = [];
  name: string = '';
  State = State;
  currentState: State = State.View;
  grammarToEdit!: Grammar;
  grammarToView!: Grammar;
  topicId: string | null = '';

  constructor(
    private grammarService: GrammarService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('GrammarTopicDetailComponent initialized');
    this.topicId = this.route.snapshot.paramMap.get('topicId');
    if (this.topicId) {
      this.loadGrammars(this.topicId);
    }
  }

  loadGrammars(topicId: string) {
    this.grammarService.getGrammarsByTopicId(topicId).subscribe({
      next: (data) => {
        console.log('Loaded grammars for topic:', data);
        this.grammarList = data.grammars;
        this.name = data.name;
      },
      error: (err) => {
        console.error('Error loading grammars:', err);
      },
    });
  }

  handleViewDetail(grammar: Grammar) {
    this.currentState = State.Detail;
    this.grammarToView = grammar;
  }

  handleEdit(grammar: Grammar) {
    console.log('Edit grammar:', grammar);
    // Implement edit functionality here
  }

  handleDelete(grammarId: string) {
    console.log('Delete grammar with ID:', grammarId);
    // Implement delete functionality here
  }

  changeToEdit(grammar: Grammar) {
    this.currentState = State.Edit;
    this.grammarToEdit = grammar;
  }

  changeToCreate() {
    this.currentState = State.Create;
    this.grammarToEdit = {} as Grammar;
  }

  backToView() {
    this.currentState = State.View;
    this.grammarToEdit = {} as Grammar;
    this.grammarToView = {} as Grammar;
  }

  handleCancel() {
    this.backToView();
    this.grammarToEdit = {} as Grammar;
  }

  handleCreate(grammarToCreate: Grammar) {
    if (this.topicId) {
      console.log(grammarToCreate);
      // TODO: Implement grammar creation
      // this.grammarService
      //   .addGrammar(this.topicId, grammarToCreate)
      //   .subscribe({
      //     next: (res) => {
      //       console.log(res);
      //       this.grammarList = this.grammarList.concat(res);
      //       this.backToView();
      //     },
      //     error: (err) => {
      //       console.log(err);
      //     },
      //   });
    }
  }
}
