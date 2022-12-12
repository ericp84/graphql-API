import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { IsEmail, Length } from "class-validator";
import { Timetracking } from "./timetracking";

@Entity()
@ObjectType()
export class Customer {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true })
  id: number;

  @Column({ nullable: true, unique: true })
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  isFavorite: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  deletedAt: string;
}
@InputType()
export class CustomerInput {
  @Field()
  name: string;

  @Field()
  isFavorite: boolean;
}
