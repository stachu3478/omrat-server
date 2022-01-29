import * as _ from 'lodash'
import {getRepository} from "typeorm";
import { User } from '../entity/User';
import AppController from './AppController';

export class SessionController extends AppController {
    private userRepository = getRepository(User);
    params: any = {}

    async my() {
      return _.pick(this.currentUser, ['email', 'role'])
    }

    async create() {
      const params = this.loginParams
      const user = await this.userRepository.findOne({ email: params.email })
      if (user?.passwordMatches(params.password)) {
        return _.pick(this.session.user = user, ['email', 'role'])
      } else {
        return { error: 'Invalid email or password', status: 422 }
      }
    }

    destroy() {
      if (this.currentUser) {
        console.log('Removin da user')
        this.session.removeUser()
        console.log('User removed')
      }
      return { status: 400 }
    }

    private get loginParams() {
      return _.pick(this.request.body, ['email', 'password']) 
    }
}