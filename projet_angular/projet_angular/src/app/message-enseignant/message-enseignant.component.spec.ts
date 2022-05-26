import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageEnseignantComponent } from './message-enseignant.component';

describe('MessageEnseignantComponent', () => {
  let component: MessageEnseignantComponent;
  let fixture: ComponentFixture<MessageEnseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageEnseignantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
