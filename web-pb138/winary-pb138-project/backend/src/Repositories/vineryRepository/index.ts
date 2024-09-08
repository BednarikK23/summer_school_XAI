import {
  createViner,
  deleteViner,
  getAllVinersPaginated,
  getVinerById,
  modifyViner,
} from './VinerRepository';

const vineryRepository = {
  getAllVinersPaginated,
  createViner,
  deleteViner,
  modifyViner,
  getVinerById,
};

export default vineryRepository;
