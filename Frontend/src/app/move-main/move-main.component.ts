import { Component } from '@angular/core';
import {
  FormsModule,
  Validators,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, DatePipe } from '@angular/common';
import { MovementService } from '../../Services/movement.service';

@Component({
  selector: 'app-move-main',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
  ],
  providers: [DatePipe],
  templateUrl: './move-main.component.html',
  styleUrl: './move-main.component.css',
})
export class MoveMainComponent {
  form: FormGroup;
  message = '';

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private movementService: MovementService,
  ) {
    // Initialize the form with fields and their validators
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern('^06(?:20|30|70|1)[0-9]{7}$')],
      ],
      pickupAddress: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      movingDate: [null, [Validators.required, this.futureDateValidator]],
      floor: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
      truckType: ['', Validators.required],
      elevator: [false],
      note: [''],
    });
  }

  // Function triggered when the form is submitted
  onSubmit(): void {
    if (this.form.valid) {
      // Call the movement service to send form data to the backend
      this.movementService.createMovement(this.form.value).subscribe({
        next: (data) => {
          console.log('Movement created: ', data);
          this.form.reset({
            name: null,
            email: null,
            phone: null,
            pickupAddress: null,
            deliveryAddress: null,
            movingDate: null,
            floor: null,
            terms: false,
            truckType: null,
            elevator: false,
            note: null,
          }); // Reset the form after successful submission
          alert('Movement has been successfully created!'); // Notify the user
        },
        error: (err) => {
          console.log('Error: ', err);
          alert('An error has been occured.'); // Show error message if request fails
        },
      });
    }
  }

  // Custom validator to ensure the selected moving date is in the future
  futureDateValidator(control: FormGroup) {
    if (!control.value) return { invalidDate: true };
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return selectedDate >= today ? null : { invalidDate: true };
  }
}
