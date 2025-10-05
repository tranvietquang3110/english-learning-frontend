import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { ListeningManagementComponent } from './listening-management.component';
import { ListeningService } from '../../../services/ListeningService';

describe('ListeningManagementComponent', () => {
  let component: ListeningManagementComponent;
  let fixture: ComponentFixture<ListeningManagementComponent>;
  let mockListeningService: jasmine.SpyObj<ListeningService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const listeningServiceSpy = jasmine.createSpyObj('ListeningService', [
      'getTopics',
      'addTopic',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ListeningManagementComponent],
      providers: [
        { provide: ListeningService, useValue: listeningServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeningManagementComponent);
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
