import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Match } from "./matches.entity";

@Entity()
export class  User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  hashedRefreshToken: string;

  @OneToMany(() => Match, (match) => match.user)
  matches: Match[]
}