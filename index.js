const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const authRouter = require('./Router/authRouter');
const chargerRouter = require('./Router/chargerRouter');
const {connectDB} = require('./utils/Database');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000;
app.use(cors({
  origin:"*",
  credentials: true,
}));
app.use(bodyParser.json());
app.use(helmet());
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/chargers', chargerRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});

connectDB()

