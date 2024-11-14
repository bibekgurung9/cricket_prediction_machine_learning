import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    battingTeam: string;

    @Column()
    bowlingTeam: string;

    @Column()
    city: string;

    @Column()
    runsLeft: number;

    @Column()
    ballsLeft: number;

    @Column()
    wicketsLeft: number;

    @Column({ type: 'float' })
    currentRunRate: number;

    @Column({ type: 'float' })
    requiredRunRate: number;

    @Column()
    target: number;

    @Column({ type: 'float' })
    team1WinProbability: number;

    @Column({ type: 'float' })
    team2WinProbability: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    matchDate: Date;

    @Column({ type: 'boolean', default: false })
    isPrediction: boolean;

    @ManyToOne(() => User, (user) => user.matches)
    user: User
}
