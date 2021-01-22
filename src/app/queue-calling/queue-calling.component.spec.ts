import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueCallingComponent } from './queue-calling.component';

describe('QueueCallingComponent', () => {
  let component: QueueCallingComponent;
  let fixture: ComponentFixture<QueueCallingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueueCallingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueCallingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
