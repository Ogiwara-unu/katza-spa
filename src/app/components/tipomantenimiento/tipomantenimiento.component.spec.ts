import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipomantenimientoComponent } from './tipomantenimiento.component';

describe('TipomantenimientoComponent', () => {
  let component: TipomantenimientoComponent;
  let fixture: ComponentFixture<TipomantenimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipomantenimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipomantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
