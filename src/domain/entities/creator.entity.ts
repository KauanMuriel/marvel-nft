import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['fullName', 'sufix'])
export class Creator {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column()
    fullName: string;

    @Column()
    sufix: string;

    @Column()
    thumbnail: string;
}