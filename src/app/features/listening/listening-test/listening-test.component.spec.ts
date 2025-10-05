import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeningTestComponent } from './listening-test.component';

describe('ListeningTestComponent', () => {
  let component: ListeningTestComponent;
  let fixture: ComponentFixture<ListeningTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeningTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeningTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
