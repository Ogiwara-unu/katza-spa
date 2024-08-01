import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrartipomantenimientoComponent } from './mostrartipomantenimiento.component';

describe('MostrartipomantenimientoComponent', () => {
  let component: MostrartipomantenimientoComponent;
  let fixture: ComponentFixture<MostrartipomantenimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrartipomantenimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrartipomantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
