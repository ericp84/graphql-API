import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinTable,
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

  @DeleteDateColumn()
  @Field({ nullable: true })
  deletedAt: Date;

  @Column({ nullable: true })
  @Field(() => ID, { nullable: true })
  userId: number;

  @Column({ nullable: true })
  @Field(() => ID, { nullable: true })
  taskId: number;

  @ManyToOne(() => User, "timetrackings", { onDelete: "CASCADE" })
  @Field(() => User, { nullable: true })
  user: User;

  @ManyToOne(() => Task, (task) => task.timetrackings)
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

  @Field()
  taskId: number;
}
