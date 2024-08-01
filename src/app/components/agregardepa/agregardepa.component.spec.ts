import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregardepaComponent } from './agregardepa.component';

describe('AgregardepaComponent', () => {
  let component: AgregardepaComponent;
  let fixture: ComponentFixture<AgregardepaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregardepaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregardepaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
