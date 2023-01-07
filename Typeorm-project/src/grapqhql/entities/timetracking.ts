import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinTable,
} from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { User } from "./user";
import { Task } from "./task";
import { Customer } from "./customer";

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
  client: string; //customer

  @Column({ nullable: true })
  @Field({ nullable: true })
  case: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  project: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  work: string; //task

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

  @Column({ nullable: true })
  @Field(() => ID, { nullable: true })
  customerId: number;

  @ManyToOne(() => User, "timetrackings", { onDelete: "CASCADE" })
  @Field(() => User, { nullable: true })
  user: User;

  @ManyToOne(() => Task, (task) => task.timetrackings)
  @Field(() => Task, { nullable: true })
  task: Task;

  @ManyToOne(() => Customer, (customer) => customer.timetrackings)
  @Field(() => Customer, { nullable: true })
  customer: Customer;
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

  @Field()
  customerId: number;
}
