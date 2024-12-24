class Customer {
  constructor(
    public customerID: string,
    public companyName: string,
    public contactName: string,
    public country: string
  ) {}
}

class CustomerSearch {
  private db: { customers: Customer[] };

  constructor(db: { customers: Customer[] }) {
    this.db = db;
  }

  searchByCountry(country: string): Customer[] {
    return this.db.customers
      .filter((customer) => customer.country.includes(country))
      .sort((firstCustomer, secondCustomer) =>
        firstCustomer.customerID.localeCompare(secondCustomer.customerID)
      );
  }

  searchByCompanyName(company: string): Customer[] {
    return this.db.customers
      .filter((customer) => customer.companyName.includes(company))
      .sort((firstCustomer, secondCustomer) =>
        firstCustomer.customerID.localeCompare(secondCustomer.customerID)
      );
  }

  searchByContact(contact: string): Customer[] {
    return this.db.customers
      .filter((customer) => customer.contactName.includes(contact))
      .sort((firstCustomer, secondCustomer) =>
        firstCustomer.customerID.localeCompare(secondCustomer.customerID)
      );
  }
}

class CustomerExporter {
  exportToCSV(data: Customer[]): string {
    return data
      .map(
        (item) =>
          `${item.customerID},${item.companyName},${item.contactName},${item.country}`
      )
      .join("\n");
  }
}
