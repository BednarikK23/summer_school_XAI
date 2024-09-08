import { Router } from 'express';
import { User } from '@prisma/client';
import { authController } from './controller';
import passport from 'passport';
import client from '../../client';
import { whoAmI } from './authrepo';

export const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post(
  '/login',
  passport.authenticate('local'),
  passport.session(),
  authController.login,
);
authRouter.get('/whoami', whoAmI);
authRouter.get('/logout', async (req, res) => {
  try {
    const sessionId = req.cookies.auth;
    if (!sessionId) {
      return res.status(500).end();
    }

    await client.session.delete({
      where: {
        id: sessionId,
      },
    });

    res.clearCookie('auth');
    return res.status(200).end();
  } catch (error) {
    console.error('Error during logout:', error);
    return res.status(500).end();
  }
});

passport.serializeUser((_user, cb) => {
  process.nextTick(() => {
    const user = _user as User;
    return cb(null, {
      id: user.id,
      username: user.name,
    });
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user!);
  });
});
