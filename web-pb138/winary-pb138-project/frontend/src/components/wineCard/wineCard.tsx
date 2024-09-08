import React from 'react';
import Button from '../buttons/Button';
import './winecard.css';
import {useNavigate} from "react-router-dom";
import { Wine } from "../../models/wine.ts";
import EditWineForm from '../forms/wines/EditWineForm.tsx';

type WineCardProps = {
    wine: Wine;
    allowEdit: boolean;
};

const WineCard: React.FC<WineCardProps> = ({ wine, allowEdit }) => {
    const navigate = useNavigate();
    return (
          <li className="wine-item" key={wine.id}>
            <div className="wine-details">
              <h2 className="wine-name">{wine.name}</h2>
            </div>
            <img
              src={"../../../public/wineDefault.webp"}
              alt={wine.name}
              className="wine-image"
            />
            <p>{wine.type} - {wine.attribution}</p>
            <p>{wine.year}</p>
            <p><strong>{wine.price} Kč</strong></p>
            <Button
              type="button"
              onClick={() => navigate(`/wines/${wine.id}`)}
            >
              Show wine
            </Button>
            {allowEdit && (
              <EditWineForm wine={wine ?? {}} label="Edit Wine" />
            )}
          </li>
    );
};

export default WineCard;
