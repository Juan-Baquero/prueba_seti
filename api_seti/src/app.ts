import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes';

class App {

  private app: Application;

  constructor(private port?: Number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  private settings() {
    this.app.set('port', process.env.PORT || this.port || 3000);
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json())
  }

  private routes() { this.app.use(routes) }

  async listen() {
    await this.app.listen(this.app.get('port'));
    console.log(`Server on port: ${this.app.get('port')}`);
  }
}

export default App;