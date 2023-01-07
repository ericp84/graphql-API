import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { Customer } from "./customer";
import { Project } from "./project";

@Entity()
@ObjectType()
export class Case {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true })
  id: number;

  @Column({ nullable: true })
  @Field(() => ID, { nullable: true })
  customerId: number;

  @Column({ nullable: true, unique: true })
  @Field({ nullable: true })
  name: string;

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

  @ManyToOne(() => Customer, "case", { nullable: true })
  @Field(() => Customer, { nullable: true })
  customer: Customer;

  @OneToMany(() => Project, "case", { nullable: true })
  @Field(() => [Project], { nullable: true })
  project: Project[];
}
@InputType()
export class CaseInput {
  @Field()
  customerId: number;

  @Field()
  name: string;

  @Field()
  isFavorite: boolean;
}
