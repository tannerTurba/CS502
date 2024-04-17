import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerRowComponent } from './owner-row.component';

describe('OwnerRowComponent', () => {
  let component: OwnerRowComponent;
  let fixture: ComponentFixture<OwnerRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
