import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from'path';
import https from'https';
import React from 'react';
import { renderToString } from'react-dom/server';
import { StaticRouter } from 'react-router-dom';
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

app.get('/*', (req, res) => {
	const context = {};
	const app = renderToString(
		<StaticRouter location={req.url} context={context}>
			<App />
		</StaticRouter>
	);

	const indexFile = path.resolve('./dist/index.html');
	fs.readFile(indexFile, 'utf8', (err, data) => {
		if (err) {
			return res.status(500).send('SSR Error!');
		}

		if (context.status === 404) {
			res.status(404);
		}

		return res.send(
			data.replace('<div id="react-app"></div>', `<div id="react-app">${app}</div>`)
		);
	});
});


https.createServer({
	key: fs.readFileSync(path.join('.', '/keys/', 'server.key')),
	cert: fs.readFileSync(path.join('.', '/keys/', 'server.cert')),
}, app).listen(process.env.SERVER_PORT || 4999, () => {
	console.log(`Express server is running on port:${process.env.SERVER_PORT}`);
});
