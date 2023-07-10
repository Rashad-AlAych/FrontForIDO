import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private loginService: LoginService, private fb: FormBuilder) {
    // Initialize the loginForm with form controls and validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      // Mark all form controls as touched to trigger validation messages
      this.markFormGroupAsTouched(this.loginForm);
      return;
    }

    // Perform the login request
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      (response) => {
        this.loginService.handleLoginResponse(response);
      },
      (error) => {
        console.log('An error occurred during login:', error);
        alert('Invalid credentials!')
      }
    );
  }

  markFormGroupAsTouched(formGroup: FormGroup): void {
    // Recursively mark all form controls as touched
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      // If the control is a nested form group, mark its controls as touched as well
      if (control instanceof FormGroup) {
        this.markFormGroupAsTouched(control);
      }
    });
  }
}
