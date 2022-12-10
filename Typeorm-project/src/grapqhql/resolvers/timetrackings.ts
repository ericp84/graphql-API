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

  @Mutation(() => Timetracking)
  async creatett(@Arg("data") data: TimetrackingInput): Promise<Timetracking> {
    return await dataSource.getRepository(Timetracking).save(data);
  }

  ///////// QUERY FIND ALL TimetrackingS /////////////
  @Query(() => [Timetracking], { nullable: true })
  async Timetrackings(): Promise<Timetracking[]> {
    return await dataSource
      .getRepository(Timetracking)
      .find({ relations: ["user"] });
  }
}
