// Feature opzionale — CustomerService con Promise.all
//
// 1. Crea interfacce ICustomerRepository e IAccountRepository (con metodi async)
// 2. Implementa InMemoryCustomerRepository e InMemoryAccountRepository
// 3. Crea CustomerService con constructor injection di entrambi i repository
// 4. Implementa getCustomerWithAccounts(customerId) che carica
//    Customer e Account[] in PARALLELO con Promise.all
// 5. Testa il tutto in una funzione main()

// --- SCRIVI IL TUO CODICE QUI ---

interface Customer {
  id: string;
  name: string;
}

interface Account {
  id: string;
  customerId: string;
  balance: number;
}

interface ICustomerRepository {
  findById(customerId: string): Promise<Customer | undefined>;
}

interface IAccountRepository {
  findByCustomerId(customerId: string): Promise<Account[]>;
}

class InMemoryCustomerRepository implements ICustomerRepository {
  private readonly customers: Customer[] = [
    { id: "customer-001", name: "Mario Rossi" },
    { id: "customer-002", name: "Giulia Bianchi" },
  ];

  async findById(customerId: string): Promise<Customer | undefined> {
    return this.customers.find((customer) => customer.id === customerId);
  }
}

class InMemoryAccountRepository implements IAccountRepository {
  private readonly accounts: Account[] = [
    { id: "account-001", customerId: "customer-001", balance: 15420.5 },
    { id: "account-002", customerId: "customer-001", balance: 820 },
    { id: "account-003", customerId: "customer-002", balance: 2300 },
  ];

  async findByCustomerId(customerId: string): Promise<Account[]> {
    return this.accounts.filter((account) => account.customerId === customerId);
  }
}

class CustomerService {
  constructor(
    private readonly customerRepository: ICustomerRepository,
    private readonly accountRepository: IAccountRepository,
  ) {}

  async getCustomerWithAccounts(
    customerId: string,
  ): Promise<{ customer: Customer | undefined; accounts: Account[] }> {
    const [customer, accounts] = await Promise.all([
      this.customerRepository.findById(customerId),
      this.accountRepository.findByCustomerId(customerId),
    ]);

    return { customer, accounts };
  }
}

async function main(): Promise<void> {
  const customerService = new CustomerService(
    new InMemoryCustomerRepository(),
    new InMemoryAccountRepository(),
  );

  const result = await customerService.getCustomerWithAccounts("customer-001");
  console.log("Cliente e conti:", result);
}

main().catch((error: unknown) => {
  console.error("Errore nel caricamento del cliente:", error);
  process.exitCode = 1;
});
