import { Query, Arg, Resolver, Mutation, ID } from "type-graphql";
import { Case, CaseInput } from "../entities/case";
import dataSource from "../../data-source";

@Resolver()
export class CaseResolver {
  ///////// MUTATION CREATE /////////
  @Mutation(() => Case)
  async createCase(@Arg("data") data: CaseInput): Promise<Case> {
    return await dataSource.getRepository(Case).save(data);
  }

  ///////// MUTATION DELETE CASES ////////
  @Mutation(() => Case)
  async deleteCase(): Promise<any> {
    return await dataSource
      .getRepository(Case)
      .createQueryBuilder()
      .delete()
      .from(Case)
      .execute();
  }

  ///////// MUTATION DELETE ONE CASE ///////////
  @Mutation(() => Case)
  async deleteOneCase(@Arg("id", () => ID) id: number): Promise<any> {
    return await dataSource
      .getRepository(Case)
      .createQueryBuilder()
      .delete()
      .where("id = :id", { id })
      .execute();
  }

  /////// MUTATION UPDATE CASE //////////
  @Mutation(() => Case)
  async updateCase(@Arg("id", () => ID) id: number, @Arg("name") name: string) {
    const CaseToUpdate = await dataSource
      .getRepository(Case)
      .findOne({ where: { id } });

    if (CaseToUpdate === null) {
      return null;
    }
    if (name !== null) {
      CaseToUpdate.name = name;
    }
    return await dataSource.getRepository(Case).save(CaseToUpdate);
  }

  ///////// QUERY FIND ALL CASES /////////////
  @Query(() => [Case], { nullable: true })
  async Cases(): Promise<Case[]> {
    return await dataSource.getRepository(Case).find({
      relations: [
        "customer",
        "project",
        "customer.timetrackings",
        "customer.timetrackings.user",
        "customer.timetrackings.task",
      ],
    });
  }

  ///////// QUERY FIND ONE CASE ///////////
  @Query(() => Case, { nullable: true })
  async Case(@Arg("id", () => ID) id: number): Promise<Case | null> {
    return await dataSource.getRepository(Case).findOne({
      where: { id },
      relations: [
        "customer",
        "project",
        "customer.timetrackings",
        "customer.timetrackings.user",
        "customer.timetrackings.task",
      ],
    });
  }
}
