import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupEventComponent } from './setup-event.component';

describe('ManageEventComponent', () => {
  let component: SetupEventComponent;
  let fixture: ComponentFixture<SetupEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
