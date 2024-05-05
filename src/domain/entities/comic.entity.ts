import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Creator } from "./creator.entity";

@Entity()
export class Comic {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column()
    title: string;

    @Column()
    isbn: string;

    @OneToOne(() => Creator)
    @JoinColumn()
    creator: string;
}