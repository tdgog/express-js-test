const express = require('express')
const cors = require('cors')
import {initDatabaseManager} from "./database/DatabaseManager";

const app = express();
const router = express.Router();

initDatabaseManager();

app.use(cors({credentials: true, origin: true}))

app.use('/', router);
app.use('/getcustomer', require('./routes/GetCustomer'));
app.use('/addcustomer', require('./routes/AddCustomer'));

app.listen(8000, () => {
    console.log(`Server is running at https://localhost:8000`);
});
