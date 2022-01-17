import {getRepository} from "typeorm";
import {User} from "../entity/User";
import AppController from "./AppController";

export class UserController extends AppController {

    private userRepository = getRepository(User);

    async all() {
        if (this.currentUser?.role !== 'admin') {
            return { status: 403 }
        }
        return this.userRepository.find();
    }

    async save() {
        if (this.currentUser?.role !== 'admin') {
            return { status: 403 }
        }
        return this.userRepository.save(Object.assign(new User(), this.request.body));
    }

    async remove() {
        if (this.currentUser?.role !== 'admin') {
            return { status: 403 }
        }
        let userToRemove = await this.userRepository.findOne(this.request.params.id);
        await this.userRepository.remove(userToRemove);
    }

}