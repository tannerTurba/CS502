import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantryCardComponent } from './pantry-card.component';

describe('PantryCardComponent', () => {
  let component: PantryCardComponent;
  let fixture: ComponentFixture<PantryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantryCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PantryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
