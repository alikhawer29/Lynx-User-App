import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ServiceStackParamList,
  MyAppointmentsStackParamList,
} from '../../interfaces';
import { ROUTES } from '../../utils/routes';
import MapView from 'react-native-maps';

type LocationViewRouteProp =
  | RouteProp<ServiceStackParamList, 'LocationView'>
  | RouteProp<MyAppointmentsStackParamList, 'LocationView'>;
type LocationViewNavigationProp = StackNavigationProp<
  ServiceStackParamList,
  'LocationView'
>;

interface Coordinates {
  latitude: number;
  longitude: number;
}

const useLocationViewController = () => {
  const { params } = useRoute<LocationViewRouteProp>();
  const navigation = useNavigation<LocationViewNavigationProp>();
  const mapRef = useRef<MapView>(null);

  const viewOnly = params?.viewOnly || false;

  const [searchAddress, setSearchAddress] = useState<string>(
    params?.address || '',
  );
  const [isConfirmed, setIsConfirmed] = useState<boolean>(!!params?.address);
  const [selectedCity, setSelectedCity] = useState<string>('');

  // Initialize with provided lat/lng if available, otherwise use default
  const initialCoords =
    (params as any)?.lat && (params as any)?.lng
      ? {
          latitude: (params as any).lat,
          longitude: (params as any).lng,
        }
      : {
          latitude: 25.2048,
          longitude: 55.2708,
        };

  const [markerCoords, setMarkerCoords] = useState<Coordinates>(initialCoords);
  const [floor, setFloor] = useState<string>(params?.floor || '');

  // Geocode the address when component loads with an address, or animate to lat/lng if provided
  useEffect(() => {
    const geocodeAddress = async () => {
      // If lat/lng are provided directly, just animate to that location
      if ((params as any)?.lat && (params as any)?.lng) {
        const coords = {
          latitude: (params as any).lat,
          longitude: (params as any).lng,
        };

        // Animate map to the location
        if (mapRef.current) {
          mapRef.current.animateToRegion(
            {
              ...coords,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
            1000,
          );
        }
        return;
      }

      // Otherwise, geocode the address if provided
      if (params?.address && params.address.length > 0) {
        try {
          const apiKey = 'AIzaSyA_iWed1MP6TIMA2r3V5zLF9VMQanjyZhU';
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              params.address,
            )}&key=${apiKey}`,
          );
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            const coords = {
              latitude: location.lat,
              longitude: location.lng,
            };
            setMarkerCoords(coords);

            // Animate map to the location
            if (mapRef.current) {
              mapRef.current.animateToRegion(
                {
                  ...coords,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                },
                1000,
              );
            }
          }
        } catch (error) {
          console.error('Geocoding error on load:', error);
        }
      }
    };

    geocodeAddress();
  }, [params?.address, (params as any)?.lat, (params as any)?.lng]);

  const onChangeSearch = useCallback(
    (text: string) => {
      setSearchAddress(text);
      // Auto-confirm when user types a valid address (more than 10 characters)
      // This simulates geocoding - in real app, you'd call Google Places API
      if (text.length > 10 && !isConfirmed) {
        setIsConfirmed(true);
        // Extract city name (simplified - in real app use geocoding API)
        setSelectedCity(text.split(',')[0] || text);
      }
    },
    [isConfirmed],
  );

  const onMarkerDragEnd = useCallback(async (e: any) => {
    const coords = e.nativeEvent.coordinate;
    setMarkerCoords(coords);

    // Reverse geocode to get address from coordinates
    try {
      const apiKey = 'AIzaSyA_iWed1MP6TIMA2r3V5zLF9VMQanjyZhU';
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${apiKey}`,
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const formattedAddress = data.results[0].formatted_address;
        setSearchAddress(formattedAddress);
        setSelectedCity(
          data.results[0].address_components[0]?.long_name || formattedAddress,
        );
      } else {
        // Fallback to coordinates
        setSearchAddress(
          `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`,
        );
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      // Fallback to coordinates
      setSearchAddress(
        `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`,
      );
    }
    setIsConfirmed(true);
  }, []);

  const onConfirm = useCallback(() => {
    // Navigate back to BookService only when we have service params (from booking flow)
    const serviceParams = params as ServiceStackParamList['LocationView'];
    if (!serviceParams.service || serviceParams.selectedTier === undefined) {
      return;
    }
    navigation.navigate(ROUTES.BOOK_SERVICE, {
      service: serviceParams.service,
      selectedTier: serviceParams.selectedTier,
      visitType: serviceParams.visitType,
      confirmedAddress: searchAddress,
      confirmedFloor: floor,
      confirmedLat: markerCoords.latitude,
      confirmedLng: markerCoords.longitude,
      firstName: serviceParams.firstName,
      lastName: serviceParams.lastName,
      phone: serviceParams.phone,
      phoneCountry: serviceParams.phoneCountry,
      phoneDialingCode: serviceParams.phoneDialingCode,
      email: serviceParams.email,
      selectedTimeSlot: serviceParams.selectedTimeSlot,
      selectedSlotId: serviceParams.selectedSlotId,
      selectedDate: serviceParams.selectedDate,
    });
  }, [params, navigation, searchAddress, floor, markerCoords]);

  const onEditAddress = useCallback(() => {
    setIsConfirmed(false);
  }, []);

  const onChangeFloor = useCallback((text: string) => {
    setFloor(text);
  }, []);

  const onSearchConfirm = useCallback(async () => {
    if (searchAddress.trim().length > 0) {
      try {
        // Use Google Geocoding API to convert address to coordinates
        const apiKey = 'AIzaSyA_iWed1MP6TIMA2r3V5zLF9VMQanjyZhU';
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            searchAddress,
          )}&key=${apiKey}`,
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          const formattedAddress = data.results[0].formatted_address;

          // Update marker position
          const newCoords = {
            latitude: location.lat,
            longitude: location.lng,
          };
          setMarkerCoords(newCoords);

          // Animate map to new location
          if (mapRef.current) {
            mapRef.current.animateToRegion(
              {
                latitude: location.lat,
                longitude: location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              },
              1000,
            );
          }

          // Update search address with formatted address
          setSearchAddress(formattedAddress);
          setSelectedCity(
            data.results[0].address_components[0]?.long_name || searchAddress,
          );
          setIsConfirmed(true);
        } else {
          // If geocoding fails, just confirm with the typed address
          setIsConfirmed(true);
          setSelectedCity(searchAddress.split(',')[0] || searchAddress);
        }
      } catch (error) {
        console.error('Geocoding error:', error);
        // Fallback: just confirm with the typed address
        setIsConfirmed(true);
        setSelectedCity(searchAddress.split(',')[0] || searchAddress);
      }
    }
  }, [searchAddress]);

  return {
    values: {
      searchAddress,
      isConfirmed,
      selectedCity,
      markerCoords,
      floor,
      viewOnly,
    },
    functions: {
      onChangeSearch,
      onConfirm,
      onEditAddress,
      onMarkerDragEnd,
      onChangeFloor,
      onSearchConfirm,
    },
    refs: {
      mapRef,
    },
  };
};

export default useLocationViewController;
