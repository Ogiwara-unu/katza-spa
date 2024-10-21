import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarmodelorepuestoComponent } from './agregarmodelorepuesto.component';

describe('AgregarmodelorepuestoComponent', () => {
  let component: AgregarmodelorepuestoComponent;
  let fixture: ComponentFixture<AgregarmodelorepuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarmodelorepuestoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarmodelorepuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
