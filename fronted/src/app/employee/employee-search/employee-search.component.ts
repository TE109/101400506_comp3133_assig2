import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {SEARCH_EMPLOYEE_BY_DESIGNATION_OR_DEPARTMENT } from '../../graphql/graphql.queries';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-employee-search',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './employee-search.component.html',
  styleUrl: './employee-search.component.css'
})
export class EmployeeSearchComponent implements OnInit {
  empList: any[] = [];
  searchForm: any;
  authBool: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private auth: AuthService,
    private router: Router 
  ) {this.authBool = auth.isAuthenticated()}

  logout(): void {
    this.auth.clearSessionToken()
    this.router.navigate(['/'])   
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      designation: ['', Validators.required],
      department: ['', Validators.required]
    })  
  }

  fetchEmployees(): void {
    const { designation, department } = this.searchForm.value;
    let variablesPassed: any = [] 

    if (designation != '') {variablesPassed.designation = designation}
    if (department != '') {variablesPassed.department = department}


    this.apollo.query({
      query: SEARCH_EMPLOYEE_BY_DESIGNATION_OR_DEPARTMENT,
      variables: variablesPassed
    }).subscribe(({ data, error }: any) => {
      if (error) {
        alert('Error fetching employees: ' + error);
        return;
      }

      this.empList = data.searchEmployeeByDesignationOrDepartment.map((emp: any) => ({
        employee_id: emp._id,
        employee_first_name: emp.first_name,
        employee_last_name: emp.last_name,
        employee_email: emp.email,
        employee_gender: emp.gender,
        employee_designation: emp.designation,
        employee_salary: emp.salary,
        employee_date_of_joining: emp.date_of_joining,
        employee_photo: emp.employee_photo,
        employee_department: emp.department,
        employee_created_at: emp.created_at,
        employee_updated_at: emp.updated_at
      }));
    });
  }
  
  
}
