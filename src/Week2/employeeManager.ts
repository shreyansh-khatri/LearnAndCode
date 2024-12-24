class Employee {
  id: number;
  name: string;
  department: string;
  working: boolean;

  constructor(id: number, name: string, department: string, working: boolean) {
    this.id = id;
    this.name = name;
    this.department = department;
    this.working = working;
  }

  isWorking(): boolean {
    return this.working;
  }
}

class EmployeeDatabase {
  static saveEmployeeToDatabase(employee: Employee): void {}
}

class EmployeeReportPrinter {
  static printEmployeeDetailReportXML(employee: Employee): void {}
  static printEmployeeDetailReportCSV(employee: Employee): void {}
}

class EmployeeTerminator {
  static terminateEmployee(employee: Employee): void {}
}
