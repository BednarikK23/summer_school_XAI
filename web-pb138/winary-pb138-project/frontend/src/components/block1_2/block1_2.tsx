import React from 'react';
import "./block1_2.css"

type Block1_2Props = {
  first: string;
  second: string;
  strong?: boolean;
};

const Block1_2: React.FC<Block1_2Props> = ({first, second, strong = true}) => {
    return (
        <span className="block1_2">

            <p className={"block1_2__first"}>
              {strong ? <strong>{first}</strong> : first}
            </p>
            <p className={"block1_2__second"}>
              {second}
            </p>
        </span>
    );
}

export default Block1_2;