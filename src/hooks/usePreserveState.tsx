import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const usePreserveState = (defaultValue: any, key: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const stateFromLocation = location.state?.[key];
  const [value, setValue] = useState(stateFromLocation || defaultValue);

  useEffect(() => {
    if (stateFromLocation !== undefined) {
      sessionStorage.setItem(key, JSON.stringify(stateFromLocation));
    }
  }, [stateFromLocation, key]);

  const setValueAndPreserve = (newValue: any) => {
    setValue(newValue);
    sessionStorage.setItem(key, JSON.stringify(newValue));
    navigate(location.pathname, {
      state: { ...location.state, [key]: newValue },
    });
  };

  return [value, setValueAndPreserve];
};
