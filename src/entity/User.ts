import * as bcrypt from 'bcrypt'
import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryColumn()
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
