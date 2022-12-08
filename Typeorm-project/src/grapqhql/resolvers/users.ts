import { Query, Arg, Resolver, Mutation, ID } from "type-graphql";
import { User, UserInput } from "../entities/user";
import dataSource from "../../data-source";
import { hash, verify } from "argon2";

@Resolver()
export class UserResolver {
  ///////// MUTATION CREATE /////////
  @Mutation(() => User)
  async createUser(@Arg("data") data: UserInput): Promise<User> {
    data.password = await hash(data.password);
    return await dataSource.getRepository(User).save(data);
  }
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("password") password: string,
    @Arg("email") email: string
  ): Promise<User | null> {
    try {
      const user = await dataSource
        .getRepository(User)
        .findOne({ where: { email } });
      if (!user) {
        return null;
      }
      if (await verify(user.password, password)) {
        return user;
      } else {
        return null;
      }
    } catch (err: any) {
      return err.message;
    }
  }

  ///////// MUTATION DELETE USERS ////////
  @Mutation(() => User)
  async deleteUser(): Promise<any> {
    return await dataSource
      .getRepository(User)
      .createQueryBuilder()
      .delete()
      .from(User)
      .execute();
  }

  ///////// MUTATION DELETE ONE USER ///////////
  @Mutation(() => User)
  async deleteOneUser(@Arg("id", () => ID) id: number): Promise<any> {
    return await dataSource
      .getRepository(User)
      .createQueryBuilder()
      .delete()
      .where("id = :id", { id })
      .execute();
  }

  /////// MUTATION UPDATE USER //////////
  @Mutation(() => User)
  async updateUser(
    @Arg("id", () => ID) id: number,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const UserToUpdate = await dataSource
      .getRepository(User)
      .findOne({ where: { id } });

    if (UserToUpdate === null) {
      return null;
    }
    if (email !== null) {
      UserToUpdate.email = email;
    }
    if (password !== null) {
      UserToUpdate.password = password;
    }
    return await dataSource.getRepository(User).save(UserToUpdate);
  }

  ///////// QUERY FIND ALL USERS /////////////
  @Query(() => [User], { nullable: true })
  async Users(): Promise<User[]> {
    const Users = await dataSource.getRepository(User).find({});
    return Users;
  }

  ///////// QUERY FIND ONE USER ///////////
  @Query(() => User, { nullable: true })
  async User(@Arg("id", () => ID) id: number): Promise<User | null> {
    return await dataSource.getRepository(User).findOne({ where: { id } });
  }
}
