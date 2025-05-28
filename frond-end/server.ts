import { APP_BASE_HREF } from '@angular/common';
import { renderApplication } from '@angular/platform-server';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import bootstrap from './src/main.server';

const app = express();
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

app.set('view engine', 'html');
app.set('views', browserDistFolder);

app.get('*.*', express.static(browserDistFolder, {
  maxAge: '1y'
}));

app.get('*', (req, res, next) => {
  const { protocol, originalUrl, baseUrl, headers } = req;

  renderApplication(bootstrap, {
    document: indexHtml,
    url: `${protocol}://${headers.host}${originalUrl}`,
    platformProviders: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
  })
  .then((html: string) => res.send(html))
  .catch((err: any) => next(err));
});

const port = process.env['PORT'] || 4000;

app.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});
