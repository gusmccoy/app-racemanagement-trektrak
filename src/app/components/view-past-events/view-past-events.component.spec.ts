import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPastEventsComponent } from './view-past-events.component';

describe('ViewPastEventsComponent', () => {
  let component: ViewPastEventsComponent;
  let fixture: ComponentFixture<ViewPastEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPastEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPastEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
