const express = require('express');
const cors = require('cors');
const route = require('./routes');
require('./config');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', route);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running at port ${PORT}`));