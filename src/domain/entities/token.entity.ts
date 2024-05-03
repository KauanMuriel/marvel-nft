import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ContentType } from "../enums/content-type";
import { User } from "./user.entity";

@Entity()
export class Token {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column({ type: "enum", enum: ContentType })
    contentType: ContentType;

    @Column({ type: "json"})
    contentData: JSON;

    @OneToOne(() => User)
    @JoinColumn()
    owner: string;
}