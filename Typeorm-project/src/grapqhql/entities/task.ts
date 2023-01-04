import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinTable,
} from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { Timetracking } from "./timetracking";

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true })
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  label: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;

  // @Column({ nullable: true })
  // @Field(() => ID, { nullable: true })
  // timetrackingId: number;

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

  @DeleteDateColumn({ nullable: true })
  @Field({ nullable: true })
  deletedAt: string;

  @OneToMany(() => Timetracking, "task")
  @Field(() => Timetracking, { nullable: true })
  timetrackings: Timetracking[];
}
@InputType()
export class TaskInput {
  @Field()
  label: string;

  @Field()
  description: string;
}
