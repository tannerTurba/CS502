import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIngredientModalComponent } from './add-ingredient-modal.component';

describe('AddIngredientModalComponent', () => {
  let component: AddIngredientModalComponent;
  let fixture: ComponentFixture<AddIngredientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddIngredientModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddIngredientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
