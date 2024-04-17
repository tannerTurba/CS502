import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestBubbleComponent } from './request-bubble.component';

describe('RequestBubbleComponent', () => {
  let component: RequestBubbleComponent;
  let fixture: ComponentFixture<RequestBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestBubbleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
