import { Strategy as LocalStrategy } from 'passport-local';
import userRepository from '../../Repositories/userRepository';
import argon2 from 'argon2';

export const passportStrategy = () =>
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      const user = await userRepository.getByEmail(email);

      if (user.isErr) {
        return done(user.error);
      }

      if (!user.value) {
        return done(null, false, { message: 'Incorrect email or password' });
      }

      const isPasswordCorrect = await argon2.verify(
        user.value.password,
        password,
      );

      if (!isPasswordCorrect) {
        return done(null, false, { message: 'Incorrect email or password' });
      }

      return done(null, user.value);
    },
  );
