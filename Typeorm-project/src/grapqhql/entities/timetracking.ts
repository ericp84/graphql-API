import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { User } from "./user";

@Entity()
@ObjectType()
export class Timetracking {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true })
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  start: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  end: string;

  @Column({ nullable: true })
  @Field(() => ID, { nullable: true })
  userId: number;

  @ManyToOne(() => User, "timetrackings", { onDelete: "CASCADE" })
  @Field(() => User, { nullable: true })
  user: User;
}

@InputType()
export class TimetrackingInput {
  @Field()
  start: string;

  @Field()
  end: string;

  @Field()
  userId: number;
}
