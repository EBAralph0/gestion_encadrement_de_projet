import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageEtudiantComponent } from './message-etudiant.component';

describe('MessageEtudiantComponent', () => {
  let component: MessageEtudiantComponent;
  let fixture: ComponentFixture<MessageEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageEtudiantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
