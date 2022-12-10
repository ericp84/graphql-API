import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { IsEmail, Length } from "class-validator";
import { Timetracking } from "./timetracking";

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true })
  id: number;

  @Column({ nullable: true, unique: true })
  @Field({ nullable: true })
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  password: string;

  @OneToMany(() => Timetracking, "user")
  @Field(() => [Timetracking])
  timetrackings: Timetracking[];
}
@InputType()
export class UserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(8, 60)
  password: string;
}
