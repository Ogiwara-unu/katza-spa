import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarmanteComponent } from './agregarmante.component';

describe('AgregarmanteComponent', () => {
  let component: AgregarmanteComponent;
  let fixture: ComponentFixture<AgregarmanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarmanteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarmanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
