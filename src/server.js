import { app } from './app.js';
import "dotenv/config"
import './db/dbConnect.js';

const HOST = 'localhost';
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Example app listening on port http://${HOST}:${PORT}`);
})

