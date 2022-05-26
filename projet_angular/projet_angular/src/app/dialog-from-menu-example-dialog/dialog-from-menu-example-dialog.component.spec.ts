import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFromMenuExampleDialogComponent } from './dialog-from-menu-example-dialog.component';

describe('DialogFromMenuExampleDialogComponent', () => {
  let component: DialogFromMenuExampleDialogComponent;
  let fixture: ComponentFixture<DialogFromMenuExampleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFromMenuExampleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFromMenuExampleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
