import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInManagementComponent } from './check-in-management.component';

describe('CheckInManagementComponent', () => {
  let component: CheckInManagementComponent;
  let fixture: ComponentFixture<CheckInManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckInManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckInManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
