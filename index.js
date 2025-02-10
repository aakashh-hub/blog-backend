const express = require('express');
const cors = require('cors');
const blogRoutes = require('./routes/blogs');
const app = express();

app.use(cors({ origin: FE_URL }));
app.use(express.json());

app.use('/blogs', blogRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});