import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['email', 'username'])
export class User {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ type: "numeric", default: 0 })
    balance: number;
}