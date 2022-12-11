import { Query, Arg, Resolver, Mutation, ID } from "type-graphql";
import { Timetracking, TimetrackingInput } from "../entities/timetracking";
import dataSource from "../../data-source";

@Resolver()
export class TimetrackingResolver {
  ///////// MUTATION CREATE /////////
  @Mutation(() => Timetracking)
  async createTimetracking(
    @Arg("data") data: TimetrackingInput
  ): Promise<Timetracking> {
    return await dataSource.getRepository(Timetracking).save(data);
  }
  ///////// MUTATION DELETE /////////
  @Mutation(() => Timetracking)
  async deleteTimetracking(): Promise<any> {
    return await dataSource
      .getRepository(Timetracking)
      .createQueryBuilder()
      .delete()
      .from(Timetracking)
      .execute();
  }
  ///////// MUTATION DELETE ONE /////////
  @Mutation(() => Timetracking)
  async deleteOneTimetracking(@Arg("id", () => ID) id: number): Promise<any> {
    return await dataSource
      .getRepository(Timetracking)
      .createQueryBuilder()
      .delete()
      .where("id = :id", { id })
      .execute();
  }
  ///////// QUERY FIND ALL TimetrackingS /////////////
  @Query(() => [Timetracking], { nullable: true })
  async Timetrackings(): Promise<Timetracking[]> {
    return await dataSource
      .getRepository(Timetracking)
      .find({ relations: ["user"] });
  }
  ///////// QUERY FIND ONE TimetrackingS /////////////
  @Query(() => Timetracking, { nullable: true })
  async Timetracking(
    @Arg("id", () => ID) id: number
  ): Promise<Timetracking | null> {
    return await dataSource
      .getRepository(Timetracking)
      .findOne({ where: { id } });
  }
}
