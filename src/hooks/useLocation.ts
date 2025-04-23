
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
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&zoom=18`,
          {
            headers: {
              'Accept-Language': 'en-US,en;q=0.9',
            },
          }
        );
        
        const data = await response.json();
        console.log('Location API response:', data);
        
        // Extract detailed address components with priority on street-level details
        const addressComponents = [];
        
        // Add building name/number if available
        if (data.address.building) addressComponents.push(data.address.building);
        
        // Add house number and road (street name)
        if (data.address.house_number) addressComponents.push(data.address.house_number);
        if (data.address.road) addressComponents.push(data.address.road);
        
        // Add neighborhood details
        if (data.address.neighbourhood) addressComponents.push(data.address.neighbourhood);
        if (data.address.suburb) addressComponents.push(data.address.suburb);
        
        // Add district/area
        if (data.address.quarter) addressComponents.push(data.address.quarter);
        if (data.address.hamlet) addressComponents.push(data.address.hamlet);
        
        // Add city/town and other higher-level components
        if (data.address.village) addressComponents.push(data.address.village);
        if (data.address.city || data.address.town) addressComponents.push(data.address.city || data.address.town);
        if (data.address.state) addressComponents.push(data.address.state);
        if (data.address.postcode) addressComponents.push(data.address.postcode);
        
        // Filter out empty values and create detailed address string
        const detailedAddress = addressComponents.filter(Boolean).join(', ');
        
        setLocationData({
          address: detailedAddress || data.display_name, // Fallback to display_name if we couldn't extract components
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching location details:', error);
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
          console.log('Got coordinates:', position.coords.latitude, position.coords.longitude);
          getLocationDetails(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
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
