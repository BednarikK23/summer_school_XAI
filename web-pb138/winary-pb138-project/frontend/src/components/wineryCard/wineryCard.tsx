import React from 'react';
import Button from '../buttons/Button';
import './winerycard.css';
import {useNavigate} from "react-router-dom";
import {Winery} from "../../models/winery.ts";

type WineryCardProps = {
    winery: Winery
};

const WineryCard: React.FC<WineryCardProps> = ({ winery }) => {
    const navigate = useNavigate();
    return (
      <li className="winery-item" key={winery.id}>
        <div className="winery-details">
          <h2 className="winery-name">{winery.name}</h2>
        </div>
        <img
          src={"../../../public/winaryDefault.webp"}
          alt={winery.name}
          className="winery-image"
        />
        <p>{winery.location}</p>
        <p>{winery.openingTime} - {winery.closingTime}</p>
        <Button
          type="button"
          onClick={() => navigate(`${winery.id}`, {relative: "path"})}
        >
          Show winery
        </Button>
      </li>
    );
};

export default WineryCard;
