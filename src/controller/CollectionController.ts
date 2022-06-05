import {getRepository} from "typeorm";
import AppController from "./AppController";
import { Collection } from "../entity/Collection";
import { pick } from "lodash";

export class CollectionController extends AppController {

    private collectionRepository = getRepository(Collection);

    async all(): Promise<any> {
        return this.collectionRepository.find();
    }

    async one() {
        return this.collectionRepository.findOne({ id: parseInt(this.request.params.id) });
    }

    async save() {
        const record = pick(this.request.body, ['name'])
        return this.collectionRepository.save(record);
    }
}