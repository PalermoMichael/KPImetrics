const express = require('express');
const mongoose = require('mongoose');
const models = require('./models');
const expressGraphQL = require('express-graphql');

const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./services/auth');
const MongoStore = require('connect-mongo')(session);
const schema = require('./schema/schema');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Connection URL
const db = 'mongodb://localhost:27017/qa';

// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise;

// Connect to Mongo
mongoose
	.connect(db)
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.log(err));

// Express configuration to use sessions.
// This places an encrypted id on the user's cookie
// User makes request -> middleware examines cookie and modifies request object to indicate user made the request
// The cookie itself only contains the id of the session
// More data about the session is stored in MongoDB
app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: 'aaabbbccc',
		store: new MongoStore({
			url: db,
			autoReconnect: true
		})
	})
);

// Passport is wired into express as middleware.
// Request comes in -> Passport examines request's session (as set by above config)
// -> assigns the current user to the 'req.user' object. See services/auth.js
app.use(passport.initialize());
app.use(passport.session());

// Instruct Express to pass any request to '/graphql' route to the GraphQL instance.
app.use(
	'/graphql',
	expressGraphQL({
		schema,
		graphiql: true
	})
);

// allow cross-origin requests
app.use(cors());
app.use(bodyParser.text({ type: 'application/graphql' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
app.use(webpackMiddleware(webpack(webpackConfig)));

// app.get('*', function (req, res) {
//     res.send(404);
// });

module.exports = app;
