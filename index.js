const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const config = require("config");



const businesses = require('./routes/businesses');
const founders = require('./routes/founders');
const auth = require('./routes/auth');
const search = require('./routes/search');

// Middleware
app.use(cors());
app.options('*', cors());

if (!config.get("jwtPrivateKey")) {
    console.error("FATAL ERROR: jwtprivatekey is not defined")
    process.exit(1);
}


mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb+srv://zolotov:qufquf-Fenfi8-jupdex@blanktechproject01-ht8w9.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/businesses', businesses);
app.use('/founders', founders);
app.use('/auth', auth);
app.use('/search', search);



// PORT
const PORT = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${PORT}....`));