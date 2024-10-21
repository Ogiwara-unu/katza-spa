import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarmarcarepuestosComponent } from './mostrarmarcarepuestos.component';

describe('MostrarmarcarepuestosComponent', () => {
  let component: MostrarmarcarepuestosComponent;
  let fixture: ComponentFixture<MostrarmarcarepuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarmarcarepuestosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarmarcarepuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
