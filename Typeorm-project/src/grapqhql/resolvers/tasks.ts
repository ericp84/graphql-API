import { Query, Arg, Resolver, Mutation, ID } from "type-graphql";
import { Task, TaskInput } from "../entities/task";
import dataSource from "../../data-source";

@Resolver()
export class TaskResolver {
  ///////// MUTATION CREATE /////////
  @Mutation(() => Task)
  async createTask(@Arg("data") data: TaskInput): Promise<Task> {
    return await dataSource.getRepository(Task).save(data);
  }
  ///////// MUTATION DELETE /////////
  @Mutation(() => Task)
  async deleteTasks(): Promise<any> {
    return await dataSource
      .getRepository(Task)
      .createQueryBuilder()
      .delete()
      .from(Task)
      .execute();
  }
  ///////// MUTATION DELETE ONE /////////
  @Mutation(() => Task)
  async deleteOneTask(@Arg("id", () => ID) id: number): Promise<any> {
    return await dataSource
      .getRepository(Task)
      .createQueryBuilder()
      .update(Task)
      .where("id = :id", { id })
      .execute();
  }
  ///////// MUTATION UPDATE ONE /////////
  //   @Mutation(() => Task)
  //   async updateOneTask(
  //     @Arg("id", () => ID) id: number,
  //     @Arg("start") start: string,
  //     @Arg("end") end: string
  //   ): Promise<Task | null> {
  //     const tt = await dataSource
  //       .getRepository(Task)
  //       .findOne({ where: { id } });

  //     if (!tt) {
  //       return null;
  //     }
  //     if (start != null) {
  //       tt.start = start;
  //     }
  //     if (end != null) {
  //       tt.end = end;
  //     }

  //     return await dataSource.getRepository(Task).save(tt);
  //   }
  ///////// QUERY FIND ALL TaskS /////////////
  @Query(() => [Task], { nullable: true })
  async Tasks(): Promise<Task[]> {
    return await dataSource
      .getRepository(Task)
      .find({ relations: ["timetrackings"] });
  }
  ///////// QUERY FIND ONE TaskS /////////////
  @Query(() => Task, { nullable: true })
  async Task(@Arg("id", () => ID) id: number): Promise<Task | null> {
    return await dataSource.getRepository(Task).findOne({ where: { id } });
  }
}
