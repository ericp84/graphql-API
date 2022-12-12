import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { IsEmail, Length } from "class-validator";
import { Timetracking } from "./timetracking";

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true })
  id: number;

  @Column({ nullable: true, unique: true })
  @Field({ nullable: true })
  label: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  deletedAt: string;

  @ManyToMany(() => Timetracking, "task")
  @Field(() => Timetracking, { nullable: true })
  timetrackings: Timetracking;
}
@InputType()
export class TaskInput {
  @Field()
  label: string;

  @Field()
  description: string;
}
