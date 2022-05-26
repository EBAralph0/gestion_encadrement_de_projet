import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VueEnseignantComponent } from './vue-enseignant.component';

describe('VueEnseignantComponent', () => {
  let component: VueEnseignantComponent;
  let fixture: ComponentFixture<VueEnseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VueEnseignantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VueEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
