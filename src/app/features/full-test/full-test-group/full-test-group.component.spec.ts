import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullTestGroupComponent } from './full-test-group.component';

describe('FullTestGroupComponent', () => {
  let component: FullTestGroupComponent;
  let fixture: ComponentFixture<FullTestGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullTestGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullTestGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
