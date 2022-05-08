import { useCallback, useEffect, useState } from "react";

const useGetCurrentLocation = () => {
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  const onSuccess = (position) => {
    const { latitude: lat, longitude: lng } = position.coords;
    setIsLoading(false);
    setCoordinates({ lat, lng });
  };

  const onError = (error) => {
    setIsLoading(false);
    setIsError(error);
  };

  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, []);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  return {
    isLoading,
    isError,
    currentCoordinates: coordinates,
    refreshCurrentLocation: getCurrentLocation,
  };
};

export default useGetCurrentLocation;
