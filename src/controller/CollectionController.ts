import {getRepository} from "typeorm";
import AppController from "./AppController";
import { Collection } from "../entity/Collection";

export class CollectionController extends AppController {

    private collectionRepository = getRepository(Collection);

    async all() {
        if (this.currentUser?.role !== 'anotator') {
            return { status: 403 }
        }
        return this.collectionRepository.find();
    }

    async one() {
        if (this.currentUser?.role !== 'anotator') {
            return { status: 403 }
        }
        return this.collectionRepository.findOne({ id: parseInt(this.request.params.id) });
    }

    async save() {
        if (this.currentUser?.role !== 'anotator') {
            return { status: 403 }
        }
        return this.collectionRepository.save(this.request.body);
    }

    async remove() {
        if (this.currentUser?.role !== 'anotator') {
            return { status: 403 }
        }
        let collecionToRemove = await this.collectionRepository.findOne(this.request.params.id);
        await this.collectionRepository.remove(collecionToRemove);
    }

}