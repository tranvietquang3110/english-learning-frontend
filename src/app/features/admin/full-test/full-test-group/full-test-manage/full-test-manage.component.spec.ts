import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullTestManageComponent } from './full-test-manage.component';

describe('FullTestManageComponent', () => {
  let component: FullTestManageComponent;
  let fixture: ComponentFixture<FullTestManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullTestManageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullTestManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
