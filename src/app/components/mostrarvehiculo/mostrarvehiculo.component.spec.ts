import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarvehiculoComponent } from './mostrarvehiculo.component';

describe('MostrarvehiculoComponent', () => {
  let component: MostrarvehiculoComponent;
  let fixture: ComponentFixture<MostrarvehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarvehiculoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarvehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
