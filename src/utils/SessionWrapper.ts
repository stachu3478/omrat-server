import { Request } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export default class SessionWrapper {
  private store: any
  private cache: { [key: string]: any } = {}
  private static globalCache: { [key: string]: Object } = {}
  
  constructor (request: Request) {
    this.store = request.session
    this.cache = this.findOrCreateCache(request.session.id)
  }

  putCache(key: string, v: any) {
    return this.cache[key] = v
  }

  takeCache(key: string, defaultValue: any = null) {
    const v = this.cache[key]
    delete this.cache[key]
    return v || defaultValue
  }

  private findOrCreateCache(id: string) {
    if (SessionWrapper.globalCache[id]) {
      return SessionWrapper.globalCache[id]
    } else {
      return SessionWrapper.globalCache[id] = {}
    }
  }

  async getUser() {
    return await getRepository(User).findOne({ email: this.store.loggedInUserEmail })
  }

  removeUser() {
    delete this.store.loggedInUserEmail
  }

  set user(user: User) {
    this.store.loggedInUserEmail = user.email
  }
}