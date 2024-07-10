const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/users', userRoutes);



const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
    .then(() => console.log('Database connected successfully !!'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello, this is the cab booking app!');
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
