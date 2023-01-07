import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { Case } from "./case";

@Entity()
@ObjectType()
export class Project {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true })
  id: number;

  @Column({ nullable: true })
  @Field(() => ID, { nullable: true })
  caseId: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  label: string;

  @ManyToOne(() => Case, "case", { nullable: true })
  @Field(() => Case, { nullable: true })
  case: Case;
}
@InputType()
export class ProjectInput {
  @Field({ nullable: true })
  caseId: number;

  @Field()
  label: string;
}
