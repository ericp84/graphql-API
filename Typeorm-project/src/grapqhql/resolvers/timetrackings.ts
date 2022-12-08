import { Query, Arg, Resolver, Mutation, ID } from "type-graphql";
import { Timetracking, TimetrackingInput } from "../entities/Timetracking";
import dataSource from "../../data-source";

@Resolver()
export class TimetrackingResolver {
  ///////// MUTATION CREATE /////////
  @Mutation(() => Timetracking)
  async createTimetracking(
    @Arg("data") data: TimetrackingInput
  ): Promise<Timetracking> {
    const tt = await dataSource.getRepository(Timetracking).save(data);
    return tt;
  }

  @Mutation(() => Timetracking)
  async creatett(@Arg("data") data: TimetrackingInput): Promise<Timetracking> {
    const tt = await dataSource.getRepository(Timetracking).save(data);
    return tt;
  }

  ///////// QUERY FIND ALL TimetrackingS /////////////
  @Query(() => [Timetracking], { nullable: true })
  async Timetrackings(): Promise<Timetracking[]> {
    const Timetrackings = await dataSource.getRepository(Timetracking).find({});
    return Timetrackings;
  }
}
