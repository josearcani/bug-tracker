import express, { Application } from 'express';
import { authRouter, usersRouter } from './routes';
import db from './db/models';

class Server {
  private app: Application;
  private port: string;
  private path: {
    auth: string;
    users: string;
  }
  
  constructor () {
    this.app = express();
    this.port = process.env.PORT || '8000';
    this.path = {
      auth: '/api/auth',
      users: '/api/users',
    }

    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB () {
    try {
      await db.sequelize.authenticate();
      console.log(`App listening on port ${this.port}`);
    } catch (error) {
      console.log('Something happened');
    }
  }

  middlewares () {
    this.app.use(express.json());
  }

  routes () {
    this.app.use(this.path.auth, authRouter);
    this.app.use(this.path.users, usersRouter);
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`App listening at localhost:${this.port}`);
    })
  }
}

export default Server;