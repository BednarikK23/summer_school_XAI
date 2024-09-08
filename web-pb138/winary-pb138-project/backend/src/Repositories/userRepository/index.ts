import {
  checkExists,
  createUser,
  deleteUser,
  getAllUsersPaginated,
  getUserById,
  modifyUser,
  getByEmail,
} from './userRepository';

const userRepository = {
  getAllUsersPaginated,
  createUser,
  deleteUser,
  modifyUser,
  getUserById,
  checkExists,
  getByEmail,
};

export default userRepository;
