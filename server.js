'use strict';

const app = require('./app');

const port = 3001;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
