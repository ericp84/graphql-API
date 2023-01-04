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
  async deleteOneTimetracking(
    @Arg("id", () => ID) id: number,
    @Arg("end") end: string,
    @Arg("start") start: string
  ): Promise<any> {
    return await dataSource
      .getRepository(Timetracking)
      .createQueryBuilder()
      .update(Timetracking)
      .where("id = :id", { id })
      .execute();
  }
  ///////// MUTATION UPDATE ONE /////////
  @Mutation(() => Timetracking)
  async updateOneTimeTracking(
    @Arg("id", () => ID) id: number,
    @Arg("start") start: string,
    @Arg("end") end: string
  ): Promise<Timetracking | null> {
    const tt = await dataSource
      .getRepository(Timetracking)
      .findOne({ where: { id } });

    if (!tt) {
      return null;
    }
    if (start != null) {
      tt.start = start;
    }
    if (end != null) {
      tt.end = end;
    }

    return await dataSource.getRepository(Timetracking).save(tt);
    // return await dataSource
    //   .getRepository(Timetracking)
    //   .createQueryBuilder()
    //   .update()
    //   .where("id = :id", { id })
    //   .execute();
  }
  ///////// QUERY FIND ALL TimetrackingS /////////////
  @Query(() => [Timetracking], { nullable: true })
  async Timetrackings(): Promise<Timetracking[]> {
    return await dataSource
      .getRepository(Timetracking)
      .find({ relations: ["user", "task"] });
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
