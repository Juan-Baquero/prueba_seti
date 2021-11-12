import App from './app';
import db from './config/database';

async function main() {
  const app = new App();
  await db.connect();
  await app.listen();
}

main();