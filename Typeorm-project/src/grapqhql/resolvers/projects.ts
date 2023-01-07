import { Query, Arg, Resolver, Mutation, ID } from "type-graphql";
import { Project, ProjectInput } from "../entities/project";
import dataSource from "../../data-source";

@Resolver()
export class ProjectResolver {
  ///////// MUTATION CREATE /////////
  @Mutation(() => Project)
  async createProject(@Arg("data") data: ProjectInput): Promise<Project> {
    return await dataSource.getRepository(Project).save(data);
  }

  ///////// MUTATION DELETE PROJECTS ////////
  @Mutation(() => Project)
  async deleteProject(): Promise<any> {
    return await dataSource
      .getRepository(Project)
      .createQueryBuilder()
      .delete()
      .from(Project)
      .execute();
  }

  ///////// MUTATION DELETE ONE PROJECT ///////////
  @Mutation(() => Project)
  async deleteOneProject(@Arg("id", () => ID) id: number): Promise<any> {
    return await dataSource
      .getRepository(Project)
      .createQueryBuilder()
      .delete()
      .where("id = :id", { id })
      .execute();
  }

  /////// MUTATION UPDATE PROJECT //////////
  @Mutation(() => Project)
  async updateProject(
    @Arg("id", () => ID) id: number,
    @Arg("label") label: string
  ) {
    const ProjectToUpdate = await dataSource
      .getRepository(Project)
      .findOne({ where: { id } });

    if (ProjectToUpdate === null) {
      return null;
    }
    if (label !== null) {
      ProjectToUpdate.label = label;
    }
    return await dataSource.getRepository(Project).save(ProjectToUpdate);
  }

  ///////// QUERY FIND ALL PROJECTS /////////////
  @Query(() => [Project], { nullable: true })
  async Projects(): Promise<Project[]> {
    return await dataSource.getRepository(Project).find({
      relations: [
        "case",
        "case.customer",
        "case.customer.timetrackings",
        "case.customer.timetrackings.task",
        "case.customer.timetrackings.user",
      ],
    });
  }

  ///////// QUERY FIND ONE PROJECT ///////////
  @Query(() => Project, { nullable: true })
  async Project(@Arg("id", () => ID) id: number): Promise<Project | null> {
    return await dataSource.getRepository(Project).findOne({
      where: { id },
      relations: [
        "case",
        "case.customer",
        "case.customer.timetrackings",
        "case.customer.timetrackings.task",
        "case.customer.timetrackings.user",
      ],
    });
  }
}
