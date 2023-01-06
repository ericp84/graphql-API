import { Query, Arg, Resolver, Mutation, ID } from "type-graphql";
import { Customer, CustomerInput } from "../entities/customer";
import dataSource from "../../data-source";
import { hash, verify } from "argon2";

@Resolver()
export class CustomerResolver {
  ///////// MUTATION CREATE /////////
  @Mutation(() => Customer)
  async createCustomer(@Arg("data") data: CustomerInput): Promise<Customer> {
    return await dataSource.getRepository(Customer).save(data);
  }

  ///////// MUTATION DELETE CUSTOMERS ////////
  @Mutation(() => Customer)
  async deleteCustomer(): Promise<any> {
    return await dataSource
      .getRepository(Customer)
      .createQueryBuilder()
      .delete()
      .from(Customer)
      .execute();
  }

  ///////// MUTATION DELETE ONE CUSTOMER ///////////
  @Mutation(() => Customer)
  async deleteOneCustomer(@Arg("id", () => ID) id: number): Promise<any> {
    return await dataSource
      .getRepository(Customer)
      .createQueryBuilder()
      .delete()
      .where("id = :id", { id })
      .execute();
  }

  /////// MUTATION UPDATE CUSTOMER //////////
  @Mutation(() => Customer)
  async updateCustomer(
    @Arg("id", () => ID) id: number,
    @Arg("name") name: string
  ) {
    const CustomerToUpdate = await dataSource
      .getRepository(Customer)
      .findOne({ where: { id } });

    if (CustomerToUpdate === null) {
      return null;
    }
    if (name !== null) {
      CustomerToUpdate.name = name;
    }
    return await dataSource.getRepository(Customer).save(CustomerToUpdate);
  }

  ///////// QUERY FIND ALL CUSTOMERS /////////////
  @Query(() => [Customer], { nullable: true })
  async Customers(): Promise<Customer[]> {
    return await dataSource.getRepository(Customer).find({
      relations: ["timetrackings", "timetrackings.task", "timetrackings.user"],
    });
  }

  ///////// QUERY FIND ONE CUSTOMER ///////////
  @Query(() => Customer, { nullable: true })
  async Customer(@Arg("id", () => ID) id: number): Promise<Customer | null> {
    return await dataSource.getRepository(Customer).findOne({
      where: { id },
      relations: ["timetrackings", "timetrackings.task", "timetrackings.user"],
    });
  }
}
