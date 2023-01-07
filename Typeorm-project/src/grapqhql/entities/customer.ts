import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { Case } from "./case";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { Timetracking } from "./timetracking";

@Entity()
@ObjectType()
export class Customer {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true })
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field(() => ID, { nullable: true })
  caseId: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  isFavorite: boolean;

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
  timetrackingId: number;

  @OneToMany(() => Case, "customer", { nullable: true })
  @Field(() => [Case], { nullable: true })
  case: Case[];

  @OneToMany(() => Timetracking, "customer", { nullable: true })
  @Field(() => [Timetracking])
  timetrackings: Timetracking[];
}
@InputType()
export class CustomerInput {
  @Field()
  name: string;

  @Field()
  isFavorite: boolean;
}
