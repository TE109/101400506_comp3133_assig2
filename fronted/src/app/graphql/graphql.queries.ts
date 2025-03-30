import { gql } from 'apollo-angular';

const GET_ALL_EMPLOYEES = gql`
  query GetAllEmployees {
    getAllEmployees {
      _id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      employee_photo
      department
      created_at
      updated_at
    }
  }
`;

const GET_EMPLOYEE_BY_ID = gql`
  query GetEmployeeById($id: ID!) {
    getEmployeeById(id: $id) {
      _id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      employee_photo
      department
      created_at
      updated_at
    }
  }
`;

const SEARCH_EMPLOYEE_BY_DESIGNATION_OR_DEPARTMENT = gql`
  query SearchEmployeeByDesignationOrDepartment($designation: String, $department: String) {
    searchEmployeeByDesignationOrDepartment(designation: $designation, department: $department) {
      _id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      employee_photo
      department
      created_at
      updated_at
    }
  }
`;

const SIGNUP_USER = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      _id
      username
      email
      created_at
      updated_at
    }
  }
`;

const LOGIN_USER = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      username
      email
      created_at
      updated_at
    }
  }
`;

const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $first_name: String!, 
    $last_name: String!, 
    $email: String!, 
    $gender: String!,
    $designation: String!, 
    $salary: Float!, 
    $date_of_joining: String!,
    $employee_photo: String, 
    $department: String!
  ) {
    addEmployee(
      first_name: $first_name,
      last_name: $last_name,
      email: $email,
      gender: $gender,
      designation: $designation,
      salary: $salary,
      date_of_joining: $date_of_joining,
      employee_photo: $employee_photo,
      department: $department
    ) {
      _id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      employee_photo
      department
      created_at
      updated_at
    }
  }
`;

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!, 
    $first_name: String, 
    $last_name: String, 
    $email: String, 
    $gender: String,
    $designation: String, 
    $salary: Float, 
    $date_of_joining: String,
    $employee_photo: String, 
    $department: String
  ) {
    updateEmployee(
      id: $id,
      first_name: $first_name,
      last_name: $last_name,
      email: $email,
      gender: $gender,
      designation: $designation,
      salary: $salary,
      date_of_joining: $date_of_joining,
      employee_photo: $employee_photo,
      department: $department
    ) {
      _id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      employee_photo
      department
      created_at
      updated_at
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      _id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      employee_photo
      department
      created_at
      updated_at
    }
  }
`;

export {
  GET_ALL_EMPLOYEES,
  GET_EMPLOYEE_BY_ID,
  SEARCH_EMPLOYEE_BY_DESIGNATION_OR_DEPARTMENT,
  SIGNUP_USER,
  LOGIN_USER,
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE
};
