import { Request, Response, NextFunction } from "express";
import SessionWrapper from "../utils/SessionWrapper";
import { User } from "../entity/User";

export default class AppController {
  public currentUser?: User
  protected request: Request
  protected response: Response
  protected next: NextFunction
  protected session: SessionWrapper

  constructor(request: Request, response: Response, next: NextFunction) {
    this.request = request
    this.response = response
    this.next = next
    this.session = new SessionWrapper(request)
  }

  async beforeAction() {
    this.currentUser = await this.session.getUser()
  }
}