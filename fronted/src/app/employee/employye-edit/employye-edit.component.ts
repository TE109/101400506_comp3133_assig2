import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { UPDATE_EMPLOYEE,GET_EMPLOYEE_BY_ID } from '../../graphql/graphql.queries';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-employye-edit',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule,CommonModule],
  templateUrl: './employye-edit.component.html',
  styleUrl: './employye-edit.component.css'
})
export class EmployyeEditComponent {
  editForm: any;
  employee: any;
  id: any;
  authBool: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private router:Router,
    private apollo: Apollo, 
    private auth: AuthService
  ) {this.authBool = auth.isAuthenticated()}

  logout(): void {
    this.auth.clearSessionToken()
    this.router.navigate(['/'])   
  }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    this.fetchEmployee(this.id);
    alert(this.employee.first_name)
  }


  fetchEmployee(id: any): void {
    this.apollo.query({
      query: GET_EMPLOYEE_BY_ID,
      variables: { id }
    }).subscribe({
      next: ({ data }: any) => {
        this.employee = data?.getEmployeeById;  
        this.editForm = this.formBuilder.group({
          first_name: this.employee.first_name,
          last_name: this.employee.last_name,
          email: this.employee.email,
          gender: this.employee.gender,
          designation: this.employee.designation,
          salary: this.employee.salary,
          date_of_joining: this.employee.date_of_joining,
          employee_photo: this.employee.employee_photo,
          department: this.employee.department,
        });
      },
      error: (error) => {
        alert('Error fetching employee: ' + error);
      }
    });
  }



  submitForm(): void {
    if (this.editForm?.valid) {
      const formValues = this.editForm.value;

      this.apollo.mutate({
        mutation: UPDATE_EMPLOYEE,
        variables: {
          id: this.id,
          first_name: formValues.first_name,
          last_name: formValues.last_name,
          email: formValues.email,
          gender: formValues.gender,
          designation: formValues.designation,
          salary: formValues.salary,
          date_of_joining: formValues.date_of_joining,
          employee_photo: formValues.employee_photo,
          department: formValues.department
        }
      }).subscribe({
        next: ({ data }: any) => {
          console.log('Sucsefully Edited employee:', data);
          this.router.navigate(['/emList'])
        },
        error: (error) => {
          console.log('Error Editing employee:', error);
        }
      });
    }
  }
}
