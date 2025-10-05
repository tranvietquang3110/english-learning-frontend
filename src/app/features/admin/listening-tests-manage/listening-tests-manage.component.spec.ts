import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ListeningService } from '../../../services/ListeningService';
import { ListeningTestsManageComponent } from './listening-tests-manage.component';
import { of } from 'rxjs';

describe('ListeningTestsManageComponent', () => {
  let component: ListeningTestsManageComponent;
  let fixture: ComponentFixture<ListeningTestsManageComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockListeningService: jasmine.SpyObj<ListeningService>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const listeningServiceSpy = jasmine.createSpyObj('ListeningService', [
      'getTopics',
      'getListeningsByTopic',
      'addListeningList',
      'addTest',
      'deleteListening',
    ]);

    await TestBed.configureTestingModule({
      imports: [ListeningTestsManageComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ListeningService, useValue: listeningServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeningTestsManageComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockListeningService = TestBed.inject(
      ListeningService
    ) as jasmine.SpyObj<ListeningService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load topics on init', () => {
    const mockTopics = {
      content: [
        {
          id: '1',
          name: 'Topic 1',
          description: 'Description 1',
          imageUrl: 'image1.jpg',
          createdAt: '2023-01-01',
        },
      ],
      totalPages: 1,
      totalElements: 1,
      pageable: {
        pageNumber: 0,
        pageSize: 10,
        sort: { sorted: false, unsorted: true, empty: true },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      last: true,
      size: 10,
      number: 0,
      sort: { sorted: false, unsorted: true, empty: true },
      numberOfElements: 1,
      first: true,
      empty: false,
    };

    mockListeningService.getTopics.and.returnValue(of(mockTopics));

    component.ngOnInit();

    expect(mockListeningService.getTopics).toHaveBeenCalled();
    expect(component.topics.length).toBe(1);
  });

  it('should select topic and load tests', () => {
    const mockTopic = {
      id: '1',
      name: 'Topic 1',
      description: 'Description 1',
      imageUrl: 'image1.jpg',
      createdAt: '2023-01-01',
    };
    const mockTests = {
      id: '1',
      name: 'Topic 1',
      description: 'Description 1',
      imageUrl: 'image1.jpg',
      createdAt: '2023-01-01',
      listenings: [
        {
          id: '1',
          name: 'Test 1',
          topic: mockTopic,
          audioUrl: '',
          imageUrl: '',
          transcript: '',
          question: '',
          options: {},
          correctAnswer: '',
          createdAt: '2023-01-01',
        },
      ],
    };

    component.topics = [mockTopic];
    mockListeningService.getListeningsByTopic.and.returnValue(of(mockTests));

    component.onTopicSelect(mockTopic);

    expect(component.selectedTopic).toEqual(mockTopic);
    expect(mockListeningService.getListeningsByTopic).toHaveBeenCalledWith('1');
  });

  it('should create test', () => {
    component.currentState = component.State.View;
    component.onCreateTest();
    expect(component.currentState).toBe(component.State.Create);
  });

  it('should go back to topics', () => {
    component.selectedTopic = {
      id: '1',
      name: 'Topic 1',
      description: 'Description 1',
      imageUrl: 'image1.jpg',
      createdAt: '2023-01-01',
    };
    component.tests = [
      {
        id: '1',
        name: 'Test 1',
        topic: component.selectedTopic,
        audioUrl: '',
        imageUrl: '',
        transcript: '',
        question: '',
        options: {},
        correctAnswer: '',
        createdAt: '2023-01-01',
      },
    ];

    component.goBackToTopics();

    expect(component.selectedTopic).toBeNull();
    expect(component.tests.length).toBe(0);
    expect(component.currentState).toBe(component.State.View);
  });

  it('should navigate to test detail on view', () => {
    const mockTest = {
      id: '1',
      name: 'Test 1',
      duration: 0,
      createdAt: '2023-01-01',
    };

    component.onViewTest(mockTest);

    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/admin/listening/tests',
      '1',
    ]);
  });

  it('should navigate to edit test on edit', () => {
    const mockTest = {
      id: '1',
      name: 'Test 1',
      duration: 0,
      createdAt: '2023-01-01',
    };

    component.onEditTest(mockTest);

    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/admin/listening/tests/edit',
      '1',
    ]);
  });
});
