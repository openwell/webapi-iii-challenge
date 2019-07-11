// code away!
require('dotenv').config()
const server = require('./server');


server.listen(process.env.PORT, () => {
    console.log(`\n*** Server Running on http://localhost:${process.env.PORT} ***\n`);
  });
