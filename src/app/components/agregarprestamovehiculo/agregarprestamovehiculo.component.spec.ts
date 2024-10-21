import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarprestamovehiculoComponent } from './agregarprestamovehiculo.component';

describe('AgregarprestamovehiculoComponent', () => {
  let component: AgregarprestamovehiculoComponent;
  let fixture: ComponentFixture<AgregarprestamovehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarprestamovehiculoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarprestamovehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
