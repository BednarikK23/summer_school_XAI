import { Request, Response, NextFunction } from 'express';
import client from '../../client';

declare module 'express-session' {
  interface SessionData {
    passport: {
      user: { username: string; id: string };
    };
  }
}
interface SessionD {
  cookie: {
    originalMaxAge: number;
    expires: string;
    secure: boolean;
    httpOnly: boolean;
    domain: string;
    path: string;
    sameSite: 'None' | 'Strict' | 'Lax';
  };
  passport?: {
    user: {
      id: string;
      username: string;
    };
  };
}

export const isAuthenticated = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = await client.session.findFirst({
    where: {
      id: { equals: req.cookies.auth },
    },
  });
  if (!token) {
    _res.status(401);
    return;
  }

  const result: SessionD = JSON.parse(token?.data!);

  if (result.passport && result.passport.user) {
    next();
  } else {
    _res.status(401);
    return;
  }
};

export const whoAmI = async (req: Request, res: Response) => {
  try {
    await client.$transaction(async (prisma) => {
      const token = await prisma.session.findFirst({
        where: {
          id: req.cookies.auth,
        },
      });
      if (!token) {
        return res.status(200).json(null).end();
      }

      const sessionData = JSON.parse(token.data);
      if (sessionData.passport && sessionData.passport.user) {
        const userId = sessionData.passport.user.id;
        const user = await prisma.user.findUnique({
          where: { id: userId },
          include: {
            vinery: true,
          },
        });
        if (user) {
          return res.status(200).json({ item: user }).end();
        } else {
          return res.status(200).json(null).end();
        }
      } else {
        return res.status(200).json(null).end();
      }
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const isAuthorizedAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = await client.session.findFirst({
      where: {
        id: { equals: req.cookies.auth },
      },
    });

    if (!token) {
      console.log('Unauthorized: No session found');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const sessionData = JSON.parse(token.data);

    if (sessionData.passport && sessionData.passport.user) {
      const userId = sessionData.passport.user.id;

      const user = await client.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          vinery: true,
        },
      });

      if (!user) {
        console.log('Unauthorized: User not found');
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (user.isAdmin) {
        console.log('Authorized as admin');
        return next();
      } else {
        console.log('Unauthorized: User is not an admin');
        return res.status(403).json({ error: 'Forbidden' });
      }
    } else {
      console.log('Unauthorized: Invalid session data');
      return res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error in isAuthorizedAdmin middleware:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
