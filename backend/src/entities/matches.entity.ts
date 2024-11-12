import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('matches')
export class MatchEntity {
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

    @Column({ type: 'boolean', default: null, nullable: true })
    result: boolean | null; 

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    matchDate: Date;
}
