import {
  createWine,
  deleteWine,
  getAllWinesPaginated,
  getWineById,
  modifyWine,
} from './wineRepository';

const userRepository = {
  getAllWinesPaginated,
  createWine,
  deleteWine,
  modifyWine,
  getWineById,
};

export default userRepository;
