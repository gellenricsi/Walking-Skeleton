import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoveMainComponent } from './move-main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

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
        MatSelectModule,
        DatePipe,
        FormsModule,
        CommonModule,
        HttpClientTestingModule,
        MoveMainComponent
      ],
      providers: [DatePipe]
    })
    .compileComponents();


    // Create the component and fixture instances
    fixture = TestBed.createComponent(MoveMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test that the component and form are created successfully
  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.form).toBeTruthy();

    // Verify that all form controls are present
    const controls = [
      'name', 'email', 'phone', 'pickupAddress', 'deliveryAddress', 
      'movingDate', 'floor', 'terms', 'note', 'elevator', 'truckType'
    ];

    controls.forEach(control => {
      expect(component.form.controls[control]).toBeTruthy();
    });
  });

  // Test that required fields are validated correctly (E.G. cannot be empty)
  it('should make name, email, phone, pickupAddress, deliveryAddress, truckType, movingDate, floor, and terms required', () => {
    const requiredFields = [
      'name', 'email', 'phone', 'pickupAddress', 'deliveryAddress', 
      'truckType', 'movingDate', 'floor', 'terms'
    ];
  
    requiredFields.forEach(field => {
      const control = component.form.controls[field];
      control.setValue('');
      expect(control.valid).toBeFalse(); // Should be invalid when empty
    });
  });

  // Test that the moving date is invalid if it is in the past
  it('should invalidate moving date when it is in the past', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 5); // Set a date 5 days in the past
  
    component.form.controls['movingDate'].setValue(pastDate);
  
    expect(component.form.controls['movingDate'].valid).toBeFalse(); // Should be invalid
    expect(component.form.controls['movingDate'].invalid).toBeTrue(); //Should return 'invalid'
  });

  // Test that the phone number is validated correctly
  it('should validate phone number correctly', () => {
    const phoneControl = component.form.controls['phone'];
  
    phoneControl.setValue('06308792592');
    expect(phoneControl.valid).toBeTrue(); // Should be valid for correct phone number
  
    phoneControl.setValue('invalid-phone');
    expect(phoneControl.valid).toBeFalse(); // Should be invalid for incorrect phone number format
  });

  // Test that the 'terms' checkbox must be checked
  it('should require terms checkbox to be checked', () => {
    const termsControl = component.form.controls['terms'];
    termsControl.setValue(false);
    expect(termsControl.valid).toBeFalse(); // Should be invalid if unchecked
  
    termsControl.setValue(true);
    expect(termsControl.valid).toBeTrue(); // Should be valid if checked
  });

  // Test that the 'truck type' field must be selected
  it('should require truck type selection', () => {
    const truckControl = component.form.controls['truckType'];
    truckControl.setValue('');
    expect(truckControl.valid).toBeFalse(); // Should be invalid if no truck type selected
  
    truckControl.setValue('Xl');
    expect(truckControl.valid).toBeTrue(); // Should be valid when truck type is selected
  }); 

  // Test that the form submits successfully when all fields are filled correctly
  it('should reset the form after successful submission', () => {
    // Fill out the form with valid values
    component.form.controls['name'].setValue('John Wick');
    component.form.controls['email'].setValue('john@wick.com');
    component.form.controls['phone'].setValue('06308792592');
    component.form.controls['pickupAddress'].setValue('123 Street');
    component.form.controls['deliveryAddress'].setValue('456 Avenue');
    component.form.controls['movingDate'].setValue(new Date('2025-05-10'));
    component.form.controls['floor'].setValue('3');
    component.form.controls['terms'].setValue(true);
    component.form.controls['truckType'].setValue('Xl');
    
    const movementServiceSpy = spyOn(component['movementService'], 'createMovement').and.returnValue(of({}));
    
    // Simulate form submission
    component.onSubmit();
    
    expect(movementServiceSpy).toHaveBeenCalled();
    
    // Check that the form is reset
    expect(component.form.controls['name'].value).toBeNull();
    expect(component.form.controls['email'].value).toBeNull();
    expect(component.form.controls['phone'].value).toBeNull();
    expect(component.form.controls['pickupAddress'].value).toBeNull();
    expect(component.form.controls['deliveryAddress'].value).toBeNull();
    expect(component.form.controls['movingDate'].value).toBeNull();
    expect(component.form.controls['floor'].value).toBeNull();
    expect(component.form.controls['terms'].value).toBeFalse();
    expect(component.form.controls['truckType'].value).toBeNull();
    expect(component.form.controls['elevator'].value).toBeFalse();
    expect(component.form.controls['note'].value).toBeNull();
  });
  
  // Test that the elevator option can be selected
  it('should allow to select elevator option', () => {
    const elevatorControl = component.form.controls['elevator'];
    
    elevatorControl.setValue(true);
    expect(elevatorControl.value).toBeTrue();
    
    elevatorControl.setValue(false);
    expect(elevatorControl.value).toBeFalse();
  });

  // Elevator option should be selected
  it('should allow to add a note', () => {
    const noteControl = component.form.controls['note'];
    noteControl.setValue('This is a note.');
    expect(noteControl.value).toBe('This is a note.'); // Note should be correctly set
  });
});
