import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { ListeningTopicDetailComponent } from './listening-topic-detail.component';
import { ListeningService } from '../../../services/ListeningService';

describe('ListeningTopicDetailComponent', () => {
  let component: ListeningTopicDetailComponent;
  let fixture: ComponentFixture<ListeningTopicDetailComponent>;
  let mockListeningService: jasmine.SpyObj<ListeningService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    const listeningServiceSpy = jasmine.createSpyObj('ListeningService', [
      'getListeningsByTopic',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    mockActivatedRoute = {
      paramMap: of(new Map([['topicId', 'test-topic-id']])),
    };

    await TestBed.configureTestingModule({
      imports: [ListeningTopicDetailComponent],
      providers: [
        { provide: ListeningService, useValue: listeningServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeningTopicDetailComponent);
    component = fixture.componentInstance;
    mockListeningService = TestBed.inject(
      ListeningService
    ) as jasmine.SpyObj<ListeningService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
