import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarmarcarepuestosComponent } from './agregarmarcarepuestos.component';

describe('AgregarmarcarepuestosComponent', () => {
  let component: AgregarmarcarepuestosComponent;
  let fixture: ComponentFixture<AgregarmarcarepuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarmarcarepuestosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarmarcarepuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
