import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarvehiComponent } from './agregarvehi.component';

describe('AgregarvehiComponent', () => {
  let component: AgregarvehiComponent;
  let fixture: ComponentFixture<AgregarvehiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarvehiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarvehiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
