import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { IsEmail, Length } from "class-validator";
import { Timetracking } from "./timetracking";

@Entity()
@ObjectType()
export class Project {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true })
  id: number;

  @Column({ nullable: true, unique: true })
  @Field({ nullable: true })
  label: string;
}
@InputType()
export class ProjectInput {
  @Field()
  label: string;
}
