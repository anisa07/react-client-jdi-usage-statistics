import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from'path';
import https from'https';
import React from 'react';
import { renderToString } from'react-dom/server';
import compression from 'compression';
import robots from 'robots.txt';
import App from'./src/App.js';

require('dotenv').config();

const app = express();
app.use(compression());
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(robots(__dirname + '/robots.txt'));
app.use('/', express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
	const app = renderToString(<App />);
	res.render(path.join(__dirname, 'src/index.pug'), {
		app
	});
});


https.createServer({
	key: fs.readFileSync(path.join('.', '/keys/', 'server.key')),
	cert: fs.readFileSync(path.join('.', '/keys/', 'server.cert')),
}, app).listen(process.env.SERVER_PORT || 4999, () => {
	console.log(`Express server is running on port:${process.env.SERVER_PORT}`);
});
