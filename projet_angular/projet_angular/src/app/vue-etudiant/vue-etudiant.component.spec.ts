import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VueEtudiantComponent } from './vue-etudiant.component';

describe('VueEtudiantComponent', () => {
  let component: VueEtudiantComponent;
  let fixture: ComponentFixture<VueEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VueEtudiantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VueEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
