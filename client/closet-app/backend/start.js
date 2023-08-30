//start server in production
const app = require('./server')
const port = process.env.PORT || 5000;

require('dotenv').config();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});