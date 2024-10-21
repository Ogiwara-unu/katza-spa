import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregartiporespuestoComponent } from './agregartiporespuesto.component';

describe('AgregartiporespuestoComponent', () => {
  let component: AgregartiporespuestoComponent;
  let fixture: ComponentFixture<AgregartiporespuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregartiporespuestoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregartiporespuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
