import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { User } from "./user";
import { Task } from "./task";

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
  @Field({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  isDeductible: boolean;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    nullable: true,
  })
  @Field({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
    nullable: true,
  })
  @Field({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  deletedAt: string;

  @Column({ nullable: true })
  @Field(() => ID, { nullable: true })
  userId: number;

  @ManyToOne(() => User, "timetrackings", { onDelete: "CASCADE" })
  @Field(() => User, { nullable: true })
  user: User;

  @ManyToMany(() => Task, "timetrackings")
  @Field(() => Task, { nullable: true })
  task: Task;
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
