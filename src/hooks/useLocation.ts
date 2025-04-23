
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface LocationData {
  address: string;
  loading: boolean;
  error: string | null;
}

export const useLocation = (): LocationData => {
  const [locationData, setLocationData] = useState<LocationData>({
    address: '',
    loading: true,
    error: null
  });

  useEffect(() => {
    const getLocationDetails = async (latitude: number, longitude: number) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
          {
            headers: {
              'Accept-Language': 'en-US,en;q=0.9',
            },
          }
        );
        
        const data = await response.json();
        
        // Construct detailed address from the response
        const addressParts = [
          data.address.house_number,
          data.address.road,
          data.address.suburb,
          data.address.city || data.address.town,
          data.address.state,
          data.address.postcode,
          data.address.country
        ].filter(Boolean);
        
        const detailedAddress = addressParts.join(', ');
        
        setLocationData({
          address: detailedAddress,
          loading: false,
          error: null
        });
      } catch (error) {
        setLocationData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to get address details'
        }));
        toast.error("Couldn't fetch address details");
      }
    };

    const getCurrentLocation = () => {
      if (!navigator.geolocation) {
        setLocationData({
          address: '',
          loading: false,
          error: 'Geolocation is not supported by your browser'
        });
        toast.error("Geolocation is not supported by your browser");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          getLocationDetails(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setLocationData({
            address: '',
            loading: false,
            error: error.message
          });
          toast.error("Location access denied. Please enable location services.");
        }
      );
    };

    getCurrentLocation();
  }, []);

  return locationData;
};
