import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { LOGIN_USER } from '../../graphql/graphql.queries';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: any;
  username: string = '';
  password: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private router: Router,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required,],
    });
  }

  submitForm(): void {
    if(this.authService.isAuthenticated() == true){
      this.router.navigate(['/emList'])
    }
    if (this.loginForm?.valid) {
      const formValues = this.loginForm.value;
      this.apollo.query({
        query: LOGIN_USER,
        variables: {
          email: formValues.email,
          password: formValues.password
        }
      }).subscribe({
        next: ({ data }: any) => {
          console.log('Sucsefully login:', data);
          const Token = 'token';  
          this.authService.saveSessionToken(Token);
          this.router.navigate(['/emList'])
        },
        error: (error) => {
          alert('Error login: ' + error);
        }
      });
    }
  }

}
