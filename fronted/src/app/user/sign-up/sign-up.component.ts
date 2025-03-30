import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { LOGIN_USER, SIGNUP_USER } from '../../graphql/graphql.queries';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.signForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required,],
    });
  }

  submitForm(): void {
    if (this.signForm?.valid) {
      const formValues = this.signForm.value;
      this.apollo.mutate({
        mutation: SIGNUP_USER,
        variables: {
          username: formValues.username,
          email: formValues.email,
          password: formValues.password
        }
      }).subscribe({
        next: ({ data }: any) => {
          console.log('Sucsefully Sign in:', data);
          this.router.navigate(['/'])
        },
        error: (error) => {
          alert('Error Signing in: ' + error);
        }
      });
    }
  }

}
