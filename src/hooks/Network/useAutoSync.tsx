import { useEffect } from "react";
import { useNetworkStatus } from "./useNetworkStatus";
import { syncOfflineData } from "../../services/Network/offlineDataService";

export const useAutoSync = () => {
  const isOnline = useNetworkStatus();

  useEffect(() => {
    if (isOnline) {
      console.log("Network is back online, syncing offline data...");
      syncOfflineData();
    }
  }, [isOnline]);
};
