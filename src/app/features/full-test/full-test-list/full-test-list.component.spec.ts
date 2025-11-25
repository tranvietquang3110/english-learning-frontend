import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullTestListComponent } from './full-test-list.component';

describe('FullTestListComponent', () => {
  let component: FullTestListComponent;
  let fixture: ComponentFixture<FullTestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullTestListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullTestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
