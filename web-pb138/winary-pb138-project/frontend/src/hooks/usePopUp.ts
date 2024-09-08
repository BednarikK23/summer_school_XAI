import { useState } from 'react';

export const usePopUp = () => {
  const [popUpStack, setPopUpStack] = useState<string[]>([]);

  const showPopUp = (message: string) => {
    setPopUpStack((prevStack) => [message, ...prevStack]);
    setTimeout(() => {
      setPopUpStack((prevStack) => prevStack.slice(0, -1));
    }, 3000);
  };

  return { popUpStack, showPopUp };
};
