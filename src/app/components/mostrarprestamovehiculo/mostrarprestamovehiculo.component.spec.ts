import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarprestamovehiculoComponent } from './mostrarprestamovehiculo.component';

describe('MostrarprestamovehiculoComponent', () => {
  let component: MostrarprestamovehiculoComponent;
  let fixture: ComponentFixture<MostrarprestamovehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarprestamovehiculoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarprestamovehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
