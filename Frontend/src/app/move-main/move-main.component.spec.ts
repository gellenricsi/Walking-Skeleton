import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoveMainComponent } from './move-main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';

describe('MoveMainComponent', () => {
  let component: MoveMainComponent;
  let fixture: ComponentFixture<MoveMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule
      ],
      declarations: [MoveMainComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoveMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.form).toBeTruthy();

    const controls = [
      'name', 'email', 'phone', 'pickupAddress', 'deliveryAddress', 
      'movingDate', 'floor', 'terms', 'note', 'elevator', 'truckType'
    ];

    controls.forEach(control => {
      expect(component.form.controls[control]).toBeTruthy();
    });
  });

  it('should make name, email, phone, pickupAddress, deliveryAddress, truckType, movingDate, floor, and terms required', () => {
    const requiredFields = [
      'name', 'email', 'phone', 'pickupAddress', 'deliveryAddress', 
      'truckType', 'movingDate', 'floor', 'terms'
    ];
  
    requiredFields.forEach(field => {
      const control = component.form.controls[field];
      control.setValue('');
      expect(control.valid).toBeFalse();
      expect(control.errors['required']).toBeTruthy();
    });
  });

  it('should validate moving date correctly', () => {
    const movingDateControl = component.form.controls['movingDate'];
  
    movingDateControl.setValue('10-05-2025');
    expect(movingDateControl.valid).toBeTrue();
  
    movingDateControl.setValue('invalid-date');
    expect(movingDateControl.valid).toBeFalse();
    expect(movingDateControl.errors['pattern']).toBeTruthy();
  });

  it('should validate phone number correctly', () => {
    const phoneControl = component.form.controls['phone'];
  
    phoneControl.setValue('00000000000');
    expect(phoneControl.valid).toBeTrue();
  
    phoneControl.setValue('invalid-phone');
    expect(phoneControl.valid).toBeFalse();
    expect(phoneControl.errors['pattern']).toBeTruthy();
  });

  it('should require terms checkbox to be checked', () => {
    const termsControl = component.form.controls['terms'];
    termsControl.setValue(false);
    expect(termsControl.valid).toBeFalse();
    expect(termsControl.errors['required']).toBeTruthy();
  
    termsControl.setValue(true);
    expect(termsControl.valid).toBeTrue();
  });

  it('should require truck type selection', () => {
    const truckControl = component.form.controls['truckType'];
    truckControl.setValue('');
    expect(truckControl.valid).toBeFalse();
    expect(truckControl.errors['required']).toBeTruthy();
  
    truckControl.setValue('Xl');
    expect(truckControl.valid).toBeTrue();
  });

  it('should submit the form when all fields are valid', () => {
    const submitButton = fixture.debugElement.query(By.css('#submitBtn'));
  
    component.form.controls['name'].setValue('John Wick');
    component.form.controls['email'].setValue('john@wick.com');
    component.form.controls['phone'].setValue('00000000000');
    component.form.controls['pickupAddress'].setValue('123 Street');
    component.form.controls['deliveryAddress'].setValue('456 Avenue');
    component.form.controls['movingDate'].setValue('2025-05-10');
    component.form.controls['floor'].setValue('3');
    component.form.controls['terms'].setValue(true);
    component.form.controls['truckType'].setValue('Xl');
  
    fixture.detectChanges();
    submitButton.nativeElement.click();
  
    expect(component.form.valid).toBeTrue();
  });

  it('should allow to select elevator option', () => {
    const elevatorControl = component.form.controls['elevator'];
    elevatorControl.setValue(true);
    expect(elevatorControl.value).toBeTrue();
  });

  it('should allow to add a note', () => {
    const noteControl = component.form.controls['note'];
    noteControl.setValue('This is a note.');
    expect(noteControl.value).toBe('This is a note.');
  });
});
