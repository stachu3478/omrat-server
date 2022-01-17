import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Collection {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column()
    creatorEmail: string

    @Column('bigint')
    createdAt = Date.now();
}
