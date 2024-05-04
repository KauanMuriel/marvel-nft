import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ContentType } from "../enums/content-type";
import { User } from "./user.entity";
import { TokenStatus } from "../enums/token-status";

@Entity()
export class Token {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column()
    contentId: string;

    @Column({ type: "enum", enum: ContentType })
    contentType: ContentType;

    @Column({ type: "json"})
    contentData: JSON;

    @ManyToOne(() => User, (owner) => owner.tokens)
    @JoinColumn()
    owner: User;

    @Column({ type: 'enum', enum: TokenStatus, default: TokenStatus.CLAIMED })
    status: TokenStatus;

    @Column({ default: 0.0 })
    price: number;
}