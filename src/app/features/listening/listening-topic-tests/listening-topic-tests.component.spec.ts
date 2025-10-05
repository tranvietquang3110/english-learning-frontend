import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { ListeningTopicTestsComponent } from './listening-topic-tests.component';
import { ListeningService } from '../../../services/ListeningService';

describe('ListeningTopicTestsComponent', () => {
  let component: ListeningTopicTestsComponent;
  let fixture: ComponentFixture<ListeningTopicTestsComponent>;
  let mockListeningService: jasmine.SpyObj<ListeningService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    const listeningServiceSpy = jasmine.createSpyObj('ListeningService', [
      'getTestsByTopicId',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    mockActivatedRoute = {
      paramMap: of(new Map([['topicId', 'test-topic-id']])),
    };

    await TestBed.configureTestingModule({
      imports: [ListeningTopicTestsComponent],
      providers: [
        { provide: ListeningService, useValue: listeningServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeningTopicTestsComponent);
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
