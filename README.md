# Employee Management System

## Usage

The Employee Management System allows you to perform the following actions:

1. **Add Employee**: Navigate to the "Add Employee" page to create a new employee record. Fill in the required fields and click "Submit" to save the employee.

2. **View Employee List**: The "Employee List" page displays a table of all the employees. You can view the details of each employee, edit their information, or delete them from the list.

3. **Search Employees**: Use the "Search by Department or Designation" page to search for employees based on their department or designation.

4. **Edit Employee**: Click the "Edit Details" button on the "Employee List" page to navigate to the "Edit Employee" page. Update the employee's information and click "Submit" to save the changes.

5. **View Employee Details**: Click the "View Details" button on the "Employee List" page to see the full details of a specific employee.

6. **Logout**: Click the "Logout" button to log out of the application.

## API

The Employee Management System provides the following GraphQL API endpoints:

### Queries

1. `getAllEmployees`: Retrieves a list of all employees.
2. `getEmployeeById(id: ID!)`: Retrieves the details of an employee by their ID.
3. `searchEmployeeByDesignationOrDepartment(designation: String, department: String)`: Searches for employees based on their designation or department.
4. `login(email: String!, password: String!)`: Logs in a user and returns the user's details.

### Mutations

1. `signup(username: String!, email: String!, password: String!)`: Creates a new user account.
2. `addEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, designation: String!, salary: Float!, date_of_joining: String!, employee_photo: String, department: String!)`: Adds a new employee.
3. `updateEmployee(id: ID!, first_name: String, last_name: String, email: String, gender: String, designation: String, salary: Float, date_of_joining: String, employee_photo: String, department: String)`: Updates an existing employee's information.
4. `deleteEmployee(id: ID!)`: Deletes an employee by their ID.
