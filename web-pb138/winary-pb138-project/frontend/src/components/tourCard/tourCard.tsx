import React from 'react';
import Button from '../buttons/Button';
import './tourCard.css';
import { Tour } from "../../models/tours.ts";
import { useNavigate } from "react-router-dom";
import { formatDate } from '../../utils/dateFormat.ts';

type TourCardProps = {
  tour: Tour;
  imageUrl: string;
};

const TourCard: React.FC<TourCardProps> = ({ tour, imageUrl}) => {
  const navigate = useNavigate();

  return (
    <div className="tour-card">
      <h2 className={"tour-name"}>{tour.name}</h2>
      <img src={imageUrl} alt={tour.name} className="tour-image"/>
      <label>{tour.address}</label>
      <label>{tour.location}</label>
      <label>{formatDate(tour.time)}</label>
      <Button onClick={() => navigate(`/tours/${tour.id}`)}>Show Tour</Button>
    </div>
  );
};

export default TourCard;
