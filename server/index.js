require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  db.query('select "productId", "name", "price", "image", "shortDescription" from "products"')
    .then(result => {
      // console.log(result);
      res.json(result.rows);
    })

    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const input = req.params.productId;
  // console.log('what you typed for productID',req.params.productId);
  if (input <= 0) {
    return res.status(400).send({
      error: ` productID:${input} must be a postive number`
    });
  } else {
    const params = [input];
    const sql2 = 'select * from "products" where "productId" =$1';
    db.query(sql2, params)
      .then(result => {
        if (!result.rows[0]) {
          const message = `error: product id ${input} not found`;
          return next(new ClientError(message, 404));
        }

        // console.log(result.rows);
        res.json(result.rows[0]);
      })
      .catch(err => next(err));
  }
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
