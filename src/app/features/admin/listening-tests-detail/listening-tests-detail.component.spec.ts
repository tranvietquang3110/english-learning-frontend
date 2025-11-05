import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeningTestsDetailComponent } from './listening-tests-detail.component';

describe('ListeningTestsDetailComponent', () => {
  let component: ListeningTestsDetailComponent;
  let fixture: ComponentFixture<ListeningTestsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeningTestsDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeningTestsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
