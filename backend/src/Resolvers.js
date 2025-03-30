const User = require("./models/User");
const Employee = require("./models/Employee");
const crypto = require('crypto');
const { validationResult } = require('express-validator');

const resolvers = {
  Query: {
    login: async (_, { email, password }) => {
      const errors = validationResult({ body: { email, password } });
      if (!errors.isEmpty()) throw new Error(JSON.stringify(errors.array()));
      if (!email) throw new Error("Email is required");
      if (!password) throw new Error("Password is required");

      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }
        const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
        if (hashedPassword !== user.password) {
          throw new Error("Invalid credentials");
        }
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    getAllEmployees: async () => {
      try {
        return await Employee.find();
      } catch (error) {
        throw new Error("Couldn't retrieve employees: " + error.message);
      }
    },

    getEmployeeById: async (_, { id }) => {
      try {
        const employee = await Employee.findById(id);
        if (!employee) {
          throw new Error("Employee not found");
        }
        return employee;
      } catch (error) {
        throw new Error("Couldn't retrieve the employee: " + error.message);
      }
    },

    searchEmployeeByDesignationOrDepartment: async (_, { designation, department }) => {
      try {
        const filter = {};
        if (designation) filter.designation = designation;
        if (department) filter.department = department;

        const employees = await Employee.find(filter);
        return employees;
      } catch (error) {
        throw new Error("Couldn't retrieve employees: " + error.message);
      }
    }
  },

  Mutation: {
    signup: async (_, { username, email, password }) => {
      const errors = validationResult({ body: { username, email, password } });
      if (!errors.isEmpty()) throw new Error(JSON.stringify(errors.array()));
      if (!username) throw new Error("Username is required");
      if (!email) throw new Error("Email is required");
      if (!password) throw new Error("Password is required");

      try {
        const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

        const newUser = new User({
          username,
          email,
          password: hashedPassword,
          created_at: new Date(),
          updated_at: new Date(),
        });

        await newUser.save();
        return newUser;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    addEmployee: async (_, { first_name, last_name, email, gender, designation, salary, date_of_joining, employee_photo, department }) => {
      try {
        const newEmployee = new Employee({
          first_name,
          last_name,
          email,
          gender,
          designation,
          salary,
          date_of_joining,
          employee_photo,
          department,
          created_at: new Date(),
          updated_at: new Date(),
        });

        await newEmployee.save();
        return newEmployee;
      } catch (error) {
        throw new Error("Couldn't add the employee: " + error.message);
      }
    },

    updateEmployee: async (_, { id, first_name, last_name, email, gender, designation, salary, date_of_joining, employee_photo, department }) => {
      try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, {
          first_name,
          last_name,
          email,
          gender,
          designation,
          salary,
          date_of_joining,
          employee_photo,
          department,
          updated_at: new Date(),
        }, { new: true });

        return updatedEmployee;
      } catch (error) {
        throw new Error("Couldn't update the employee: " + error.message);
      }
    },

    deleteEmployee: async (_, { id }) => {
      try {
        const employee = await Employee.findByIdAndDelete(id);
        return employee;
      } catch (error) {
        throw new Error("Couldn't delete the employee: " + error.message);
      }
    }
  }
};

module.exports = resolvers;
