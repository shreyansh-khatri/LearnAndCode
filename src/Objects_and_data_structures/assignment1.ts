class Employee {
  private name: string;
  private age: number;
  private salary: number;

  constructor() {
    this.name = "";
    this.age = 0;
    this.salary = 0;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getAge(): number {
    return this.age;
  }

  setAge(age: number): void {
    this.age = age;
  }

  getSalary(): number {
    return this.salary;
  }

  setSalary(salary: number): void {
    this.salary = salary;
  }
}

let employee = new Employee(); // Equivalent to 'Employee employee;' in C++

/*
   Answer:
   - 'employee' is an object.
   - In C++, 'Employee employee' creates an instance of the Employee class.
   - An object is an instance of a class that has defined properties and behaviors.
   - It is not just a data structure because it contains both data (name, age, salary) and methods (getters and setters).
   - A data structure typically refers to a collection of data elements (e.g., arrays, structs), while an object has both data and behavior.
*/
