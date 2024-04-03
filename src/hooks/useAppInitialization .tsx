import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAppInitialization = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAppReady(true); // Simply set the app as ready once we receive the auth state.
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []); // No dependencies are needed here since we're not using setIsAuthenticated from the context.

  return isAppReady;
};

export default useAppInitialization;
