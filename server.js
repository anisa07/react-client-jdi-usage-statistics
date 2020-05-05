import express from 'express';
import bodyParser from 'body-parser';
import serialize from "serialize-javascript";
import register from 'ignore-styles';
import fs from 'fs';
import path from'path';
import https from'https';
import React from 'react';
import { Provider } from 'mobx-react';
import { renderToString } from'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import compression from 'compression';
import robots from 'robots.txt';
import App from './src/App';
import Store from "./src/store/store";

register(['.sass', '.scss']);
require('dotenv').config();
const store = new Store();

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
			<Provider store={store}><App/></Provider>
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

		data = data.replace('<script>window.__INITIAL_DATA__</script>',
			`<script>window.__INITIAL_DATA__ = ${serialize(store)}</script>`);
		data = data.replace('<div id="react-app"></div>', `<div id="react-app">${app}</div>`);

		return res.send(
			data
		);
	});
});


https.createServer({
	key: fs.readFileSync(path.join('.', '/keys/', 'server.key')),
	cert: fs.readFileSync(path.join('.', '/keys/', 'server.cert')),
}, app).listen(process.env.SERVER_PORT || 4999, () => {
	console.log(`Express server is running on port:${process.env.SERVER_PORT}`);
});

// const renderView = (req, appstate) => {
//
// 	const componentHTML = renderToString(
// 		<Provider appstate={ appstate }>
// 			<Router path={ req.url } />
// 		</Provider>
// 	);
//
// 	const HTML = `
//         <!DOCTYPE html>
//         <html>
//             <head>
//                 <meta charset="utf-8">
//                 <title>MobX Test</title>
//                 <script>
//                     window.__INITIAL_STATE__ = ${ JSON.stringify({ appstate: appstate.toJson() }) };
//                 </script>
//             </head>
//             <body>
//                 <div id="root">${componentHTML}</div>
//                 <script type="application/javascript" src="/bundle.js"></script>
//             </body>
//         </html>
//     `;
//
// 	return HTML;
// };
//
// createServer((req, res) => {
//
// 	if(req.url === '/bundle.js') {
// 		res.writeHead(200, {'Content-Type': 'text/javascript'});
// 		fs.createReadStream(path.resolve(__dirname, '../../dist/bundle.js')).pipe(res);
// 	} else {
//
// 		if(routes.has(req.url)) {
//
// 			const appstate = new AppState();
// 			appstate.addItem('foo');
// 			appstate.addItem('bar');
//
// 			res.write(renderView(req, appstate));
// 			res.end();
//
// 		} else {
//
// 			res.writeHead(200, {'Content-Type': 'text/plain'});
// 			res.write('404 Not Found\n');
// 			res.end();
//
// 		}
// 	}
//
// }).listen(3000)
