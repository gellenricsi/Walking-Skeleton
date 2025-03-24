import { Component } from '@angular/core';
import { FormsModule, Validators, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
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
    FormsModule
  ],
  providers: [DatePipe],
  templateUrl: './move-main.component.html',
  styleUrl: './move-main.component.css'
})
export class MoveMainComponent{
  form: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private datePipe: DatePipe, private movementService: MovementService) {

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^06(?:20|30|70|1)[0-9]{7}$')]],
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

  onSubmit(): void {
    if (this.form.valid) {
      const formattedDate = this.datePipe.transform(this.form.get('movingDate')?.value, 'yyyy-MM-dd');
      
      this.movementService.createMovement(this.form.value)
      .subscribe({
        next: (data) => {
          console.log('Movement created: ', data);
          this.form.reset();
          alert("Movement has been successfully created!");
        },
        error: (err) => {
          console.log('Error: ', err);
          alert("An error has been occured.");
        }
      })
    }
  }

  futureDateValidator(control: FormGroup) {
    if (!control.value) return { invalidDate: true };
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    return selectedDate >= today ? null : { invalidDate: true };
  }
}
