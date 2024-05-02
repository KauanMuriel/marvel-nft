import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { VariantDescription } from "../enums/variant-description.enum";
import { Creator } from "./creator.entity";

@Entity()
export class Comic {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column()
    title: string;

    @Column({ type: 'enum', enum: VariantDescription })
    variantDescription: string;

    @Column()
    isbn: string;

    @OneToOne(() => Creator)
    @JoinColumn()
    creator: string;
}