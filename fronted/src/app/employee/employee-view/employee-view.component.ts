import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_EMPLOYEE_BY_ID } from '../../graphql/graphql.queries';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-employee-view',
  imports: [RouterLink, RouterOutlet,CommonModule],
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {
  employee: any;
  authBool: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
     private apollo: Apollo, 
     private auth: AuthService) {this.authBool = auth.isAuthenticated()}

  logout(): void {
    this.auth.clearSessionToken()
    this.router.navigate(['/'])   
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.fetchEmployee(id);
  }

  fetchEmployee(id: any): void {
    this.apollo.query({
      query: GET_EMPLOYEE_BY_ID,
      variables: { id }
    }).subscribe({
      next: ({ data }: any) => {
        this.employee = data?.getEmployeeById;
      },
      error: (error) => {
        alert('Error fetching employee: ' + error);
      }
    });
  }
}
