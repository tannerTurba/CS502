import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThePantryComponent } from './the-pantry.component';

describe('ThePantryComponent', () => {
  let component: ThePantryComponent;
  let fixture: ComponentFixture<ThePantryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThePantryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThePantryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
