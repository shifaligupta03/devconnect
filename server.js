const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const keys = require('./config/keys');
const passport = require('passport');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('connected'))
.catch((err)=>console.log(err));

require('./config/passport')(passport);

app.use(passport.initialize());

app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);



app.get('/', (req, res)=> res.send('Hello'));

const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log(`server listening to port ${port}`));