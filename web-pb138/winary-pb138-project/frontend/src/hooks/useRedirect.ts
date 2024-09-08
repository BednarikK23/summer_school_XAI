import { useEffect, useState } from 'react';

const useRedirect = (shouldRedirect: boolean, delay: number) => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (shouldRedirect) {
      const timer = setTimeout(() => {
        setRedirect(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [shouldRedirect, delay]);

  return redirect;
};

export default useRedirect;
