import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingEventComponent } from './ongoing-event.component';

describe('OngoingEventComponent', () => {
  let component: OngoingEventComponent;
  let fixture: ComponentFixture<OngoingEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngoingEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngoingEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
