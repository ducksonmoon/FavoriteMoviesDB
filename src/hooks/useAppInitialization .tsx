import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAppInitialization = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAppReady(true);
    });

    return () => unsubscribe();
  }, []);

  return isAppReady;
};

export default useAppInitialization;
