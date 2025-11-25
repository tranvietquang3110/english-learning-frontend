import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullTestGroupAddComponent } from './full-test-group-add.component';

describe('FullTestGroupAddComponent', () => {
  let component: FullTestGroupAddComponent;
  let fixture: ComponentFixture<FullTestGroupAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullTestGroupAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullTestGroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
