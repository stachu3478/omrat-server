import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import {User} from "./entity/User";
import session = require("express-session");
import { TypeormStore } from "connect-typeorm/out";
import Session from "./entity/Sesssion";
import * as cors from "cors"

function handleResponse(req: Request, res: Response, result: any) {
    let sent = result
    JSON.stringify(res.getHeaders())
    if (process.env.NODE_ENV !== 'production') { // Broken cookies on local cors
        const setCookie = res.getHeader('Set-Cookie')
        if (setCookie) {
            sent = sent || {}
            sent['Set-Cookie'] = res.getHeader('Set-Cookie')
        }
    }
    
    if (result !== null && result !== undefined) {
        const { status } = result
        if (status) {
            res.status(status)
        } else if (req.method === 'get') {
            res.status(200)
        } else if (req.method === 'post') {
            res.status(201)
        } else if (req.method === 'delete') {
            res.status(204)
        }
        res.json(result);
    } else if (req.method === 'delete') {
        res.status(204)
    }
}

createConnection().then(async connection => {
    const corsPolicy = cors({
        origin: true,
        credentials: true,
        allowedHeaders: ['Set-Cookie', 'x-requested-with', 'content-type', 'content-length', 'X-Powerered-By']
    })

    // create express app
    const app = express();
    app.use(corsPolicy)
    app.use(bodyParser.json());
    app.use(session({
        secret: process.env.SESSION_SECRET || 'secret',
        resave: true,
        saveUninitialized: true,
        store: new TypeormStore({
            cleanupLimit: 2,
            limitSubquery: false,
            ttl: 86400
        }).connect(getRepository(Session))
    }))

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: express.NextFunction) => {
            const controller = new route.controller(req, res, next)
            controller.beforeAction().then(() => {
                const result = (controller as any)[route.action](req, res, next);
                if (result instanceof Promise) {
                    result.then((result) => handleResponse(req, res, result));
                } else {
                    handleResponse(req, res, result)
                }
            })
        });
    });

    app.options('*', corsPolicy)
    app.use('*', (req: Request, res: Response) => {
      res.status(404)
      res.end()
    })

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    // insert new users for test
    const userRepo = getRepository(User)

    await userRepo.save(Object.assign(new User(), {
        email: "timbersam@fmail.com",
        role: 'admin',
        password: 'admin'
    }));
    await userRepo.save(Object.assign(new User(), {
        email: "phantomassassin@gmail.com",
        role: 'anotator',
        password: 'anotator'
    }));

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
