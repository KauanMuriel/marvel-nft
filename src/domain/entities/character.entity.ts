import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Character {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    thumbnail: string;
}