import {
  addWinerToTour,
  createTour,
  deleteTour,
  getAllToursPaginated,
  getTourById,
  modifyTour,
  deleteWinerFromTour,
} from './repository';
const tourRepository = {
  getAllToursPaginated,
  createTour,
  modifyTour,
  deleteTour,
  getTourById,
  addWinerToTour,
  deleteWinerFromTour,
};

export default tourRepository;
