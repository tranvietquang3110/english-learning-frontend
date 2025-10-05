import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlay, faFileAlt } from '@fortawesome/free-solid-svg-icons';

import { ListeningService } from '../../../services/ListeningService';
import { TopicBase } from '../../../models/topic-base';
import { TopicCardComponent } from '../../../shared/topic-card/topic-card.component';

@Component({
  selector: 'app-listening-topics',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, TopicCardComponent],
  templateUrl: './listening-topic.component.html',
})
export class ListeningTopicsComponent implements OnInit {
  faPlay = faPlay;
  faFileAlt = faFileAlt;
  topics: TopicBase[] = [];
  constructor(
    private router: Router,
    private listeningService: ListeningService
  ) {}

  ngOnInit(): void {
    this.listeningService.getTopics().subscribe((res) => {
      console.log(res);
      res.content.forEach((topic) => {
        this.topics.push({
          description: topic.description,
          id: topic.id,
          imageUrl: topic.imageUrl,
          name: topic.name,
          progress: 0,
          status: 'Complete',
        });
      });
    });
  }

  goToPractice(topic: TopicBase) {
    this.router.navigate([`/listening/practice/${topic.id}`]);
  }

  goToTest(topic: TopicBase) {
    this.router.navigate([`/listening/topics/tests/${topic.id}`]);
  }
}
