import { Entity, PrimaryGeneratedColumn, Column, Unique, JoinColumn, OneToOne } from "typeorm";
import { Creator } from "./creator.entity";
import { Character } from "./character.entity";
import { Comic } from "./comic.entity";

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

    @OneToOne(() => Creator)
    @JoinColumn()
    favoriteCreator: string;

    @OneToOne(() => Character)
    @JoinColumn()
    favoriteCharacter: string;

    @OneToOne(() => Comic)
    @JoinColumn()
    favoriteComic: string;

    @Column({ type: 'boolean', default: false})
    admin: boolean;
}