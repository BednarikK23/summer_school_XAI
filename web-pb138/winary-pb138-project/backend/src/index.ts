import { config } from 'dotenv';
import { env } from 'process';
import usersRouter from './Routers/user/router';
import wineryRouter from './Routers/vinary/router';
import wineRouter from './Routers/wine/router';
import { authRouter } from './Routers/auth/router';
import passport from 'passport';
import { passportStrategy } from './Routers/auth/passportStrategy';
import session from 'express-session';
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
import cookieParser from 'cookie-parser';
import client from './client';
import orderRouter from './Routers/order/router';
import tourRouter from './Routers/tour/router';

async function main() {
  await client.$connect();
  console.log('connecting....');
}

main()
  .then(async () => {
    console.log('connected!!');
  })
  .catch((error) => {
    console.error('failed to connect', error);
  });

config();

const port = env.PORT ?? 3000;
const express = require('express');
const app = express();
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Your existing middleware and routes

// JSON middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Use CORS middleware

// Logger middleware
app.use((req, _res, next) => {
  const body = req.body;
  const method = req.method;
  const path = req.path;
  const queryParams = req.query;
  const params = req.params;

  console.log(`[${new Date().toISOString()}] ${method} ${path}`);
  console.log(`Query: ${JSON.stringify(queryParams)}`);
  console.log(`Params: ${JSON.stringify(params)}`);
  console.log(`Body: ${JSON.stringify(body)}`);
  console.log(req.session);
  console.log('-------------------');
  next();
});

passport.use(passportStrategy());

// parse URL encoded strings
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    cookie: {
      domain: 'localhost',
      maxAge: 60 * 60 * 60 * 60,
      httpOnly: true,
      sameSite: 'none',
      secure: false,
    },
    secret: 'a santa at nasa',
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(client, {
      checkPeriod: 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);

// DO NOT MODIFY THE PRECEDING code ^^
app.use('/users', usersRouter);
app.use('/wineries', wineryRouter);
app.use('/wines', wineRouter);
app.use('/auth', authRouter);
app.use('/orders', orderRouter);
app.use('/tours', tourRouter);
// DO NOT MODIFY THE FOLLOWING code:

// No route was taken - 404 - Resource (API endpoint) not found.
// Default route returning 404
app.use((_req, res) => {
  res.status(404).send('Not found');
});

if (env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(
      `[${new Date().toISOString()}] RESTful API for winary is listening on port ${port}`,
    );
  });
}
