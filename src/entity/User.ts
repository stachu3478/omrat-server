import * as bcrypt from 'bcrypt'
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    role: string;

    @Column()
    passwordHash: string;

    public passwordMatches(val: string) {
        if (!this.passwordHash) {
            return false
        }
        return bcrypt.compareSync(val, this.passwordHash)
    }

    set password(val: string) {
        this.passwordHash = bcrypt.hashSync(val, 10)
    }
}
