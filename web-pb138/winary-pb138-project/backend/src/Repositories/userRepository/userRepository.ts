import client from '../../client';
import { Result } from '../../../node_modules/@badrap/result/src/index';
import argon2 from 'argon2';
import {
  CreateUserRequest,
  DeleteUserRequest,
  GetUserByIdRequest,
  ModifyUserRequest,
} from './types/requestTypes';
import {
  CreateUserResult,
  DeleteUserResult,
  GetAllUsersResult,
  GetUserByIdResult,
  ModifyUserResult,
} from './types/responceTypes';
import { PaginatedRequest } from '../types';

export async function getAllUsersPaginated(
  request: PaginatedRequest,
): Promise<GetAllUsersResult> {
  const pageSize = 10;

  try {
    const result = await client.$transaction(async (tx) => {
      let queryFilter = {};
      if (request.query) {
        queryFilter = {
          where: {
            name: {
              contains: request.query,
              mode: 'insensitive',
            },
          },
        };
      }

      const totalCount = await tx.user.count(queryFilter);
      const totalPages = Math.ceil(totalCount / pageSize);
      const users = await tx.user.findMany({
        ...queryFilter,
        take: pageSize,
        skip: (request.page - 1) * pageSize,
      });
      return { data: users, pages: totalPages };
    });

    return Result.ok(result);
  } catch (error) {
    return Result.err(new Error('Failed to fetch users'));
  }
}

export async function checkExists(email: string): Promise<Result<boolean>> {
  try {
    const user = await client.user.findUnique({
      where: {
        email: email,
      },
    });
    return Result.ok(!!user);
  } catch (error) {
    return Result.err(new Error());
  }
}

export async function createUser(
  request: CreateUserRequest,
): Promise<CreateUserResult> {
  try {
    const hashedPassword = await argon2.hash(request.user.password);

    const newUser = await client.user.create({
      data: {
        ...request.user,
        password: hashedPassword,
      },
    });

    return Result.ok(newUser);
  } catch (error) {
    return Result.err(new Error('Failed to create user'));
  } finally {
    await client.$disconnect();
  }
}

export async function modifyUser(
  request: ModifyUserRequest,
): Promise<ModifyUserResult> {
  try {
    const updatedUser = await client.user.update({
      where: { id: request.userId },
      data: request.user,
    });
    return Result.ok(updatedUser);
  } catch (error) {
    return Result.err(new Error('Failed to modify user'));
  }
}

export async function deleteUser(
  request: DeleteUserRequest,
): Promise<DeleteUserResult> {
  const { userId } = request;

  try {
    await client.$transaction(async (prisma) => {
      /*const userWithVinary = await prisma.user.findUniqueOrThrow({
                where: { id: userId },
                include: {
                    vinery: true,
                },
            });

            if (userWithVinary.vinery.length > 0) {
                await prisma.vinary.deleteMany({
                    where: {
                        ownerId: userId,
                    },
                });
            }*/

      await prisma.user.delete({
        where: { id: userId },
      });
    });

    return Result.ok(undefined);
  } catch (error) {
    return Result.err(new Error('Failed to delete user'));
  } finally {
    await client.$disconnect();
  }
}

export async function getUserById(
  request: GetUserByIdRequest,
): Promise<GetUserByIdResult> {
  try {
    const user = await client.user.findUniqueOrThrow({
      where: { id: request.userId },
    });
    return Result.ok(user);
  } catch (error) {
    throw new Error('Failed to fetch user: ');
  }
}

export async function getByEmail(email: string): Promise<GetUserByIdResult> {
  try {
    const user = await client.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return Result.ok(null);
    }

    return Result.ok(user);
  } catch (error) {
    console.error('Error in getByEmail:', error);
    return Result.err(new Error());
  }
}
