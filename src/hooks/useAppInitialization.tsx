import { useState, useEffect } from "react";

const useAppInitialization = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAppReady(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return isAppReady;
};

export default useAppInitialization;
