import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useState } from 'react';
import { ServiceStackParamList } from '../../interfaces';
import { ROUTES } from '../../utils/routes';
import { useCreateBookingMutation } from '../../redux/Apis/Booking';
import dayjs from 'dayjs';

type ServiceDateTimeRouteProp = RouteProp<
  ServiceStackParamList,
  'ServiceDateTime'
>;
type ServiceDateTimeNavigationProp = StackNavigationProp<
  ServiceStackParamList,
  'ServiceDateTime'
>;

const useServiceDateTimeController = () => {
  const { params } = useRoute<ServiceDateTimeRouteProp>();
  const navigation = useNavigation<ServiceDateTimeNavigationProp>();
  const [createBooking, { isLoading: isBookingLoading }] =
    useCreateBookingMutation();

  const [sessionTime, setSessionTime] = useState<'AM' | 'PM'>('AM');
  const [sessionDate, setSessionDate] = useState<string>(
    params?.selectedDate || '',
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(
    params?.selectedTimeSlot || '',
  );
  const [selectedSlotId, setSelectedSlotId] = useState<string>(
    params?.selectedSlotId || '',
  );

  const onSelectSessionTime = useCallback((time: 'AM' | 'PM') => {
    setSessionTime(time);
  }, []);

  const onSelectSessionDate = useCallback(() => {
    // In real implementation, open date picker
    // For now, just toggle between two dates
    setSessionDate(prev =>
      prev === '12/04/2024' ? '13/04/2024' : '12/04/2024',
    );
  }, []);

  const onSelectTimeSlot = useCallback((slot: string) => {
    setSelectedTimeSlot(slot);
  }, []);

  const onEditAddress = useCallback(() => {
    navigation.navigate(ROUTES.BOOK_SERVICE, {
      service: params.service,
      selectedTier: params.selectedTier,
      confirmedAddress: params.address,
      confirmedFloor: params.floor,
      confirmedLat: params.lat,
      confirmedLng: params.lng,
      firstName: params.firstName,
      lastName: params.lastName,
      phone: params.phone,
      phoneCountry: params.phoneCountry,
      phoneDialingCode: params.phoneDialingCode,
      email: params.email,
      selectedTimeSlot: selectedTimeSlot,
      selectedSlotId: selectedSlotId,
      selectedDate: sessionDate,
    });
  }, [params, navigation, selectedTimeSlot, selectedSlotId, sessionDate]);

  const onEditContact = useCallback(() => {
    navigation.navigate(ROUTES.BOOK_SERVICE, {
      service: params.service,
      selectedTier: params.selectedTier,
      confirmedAddress: params.address,
      confirmedFloor: params.floor,
      confirmedLat: params.lat,
      confirmedLng: params.lng,
      firstName: params.firstName,
      lastName: params.lastName,
      phone: params.phone,
      phoneCountry: params.phoneCountry,
      phoneDialingCode: params.phoneDialingCode,
      email: params.email,
      selectedTimeSlot: selectedTimeSlot,
      selectedSlotId: selectedSlotId,
      selectedDate: sessionDate,
    });
  }, [params, navigation, selectedTimeSlot, selectedSlotId, sessionDate]);

  const onContinue = useCallback(async () => {
    try {
      // Extract time from selectedTimeSlot (e.g., "06:00 AM - 06:30 AM" -> "06:00")
      const timeMatch = selectedTimeSlot.match(/(\d{2}:\d{2})/);
      const sessionTimeFormatted = timeMatch ? timeMatch[1] : '00:00';

      // Format date to YYYY-MM-DD
      const sessionDateFormatted = dayjs(sessionDate, 'DD/MM/YYYY').format(
        'YYYY-MM-DD',
      );

      const payload = {
        service_id: params.service._id,
        category_id: params.service.category._id || params.service._id,
        price_type: params.selectedTier === 0 ? 'normal' : 'premium',
        price:
          params.selectedTier === 0
            ? params.service.category.price.normal
            : params.service.category.price.premium,
        address: {
          full_address: params.address,
          lat: params.lat || 0,
          lng: params.lng || 0,
          floor: params.floor || '',
        },
        contact_details: {
          first_name: params.firstName || '',
          last_name: params.lastName || '',
          country_code: params.phoneDialingCode || '+971',
          phone_number: params.phone || '',
          email: params.email || '',
        },
        session_date: sessionDateFormatted,
        session_time: sessionTimeFormatted,
        slot_id: selectedSlotId,
      };

      const result = await createBooking(payload).unwrap();

      // Navigate to payment screen with booking_id
      if (result?.data?._id) {
        navigation.navigate(ROUTES.PAYMENT_DETAILS, {
          service: params.service,
          selectedTier: params.selectedTier,
          address: params.address,
          floor: params.floor,
          firstName: params.firstName || '',
          lastName: params.lastName || '',
          phone: params.phone || '',
          email: params.email || '',
          sessionTime,
          sessionDate,
          availableHours: selectedTimeSlot,
          bookingId: result.data._id,
          bookingNumber: result.data.booking_id || result.data._id,
        });
      }
    } catch (error) {
      console.error('Booking error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
    }
  }, [
    params,
    sessionTime,
    sessionDate,
    selectedTimeSlot,
    navigation,
    createBooking,
  ]);

  const onViewAddress = useCallback(() => {
    navigation.navigate(ROUTES.LOCATION_VIEW, {
      service: params.service,
      selectedTier: params.selectedTier,
      address: params.address,
      floor: params.floor,
      viewOnly: true,
    });
  }, [params, navigation]);

  const onEditService = useCallback(() => {
    navigation.navigate(ROUTES.BOOK_SERVICE, {
      service: params.service,
      selectedTier: params.selectedTier,
      confirmedAddress: params.address,
      confirmedFloor: params.floor,
      confirmedLat: params.lat,
      confirmedLng: params.lng,
      firstName: params.firstName,
      lastName: params.lastName,
      phone: params.phone,
      phoneCountry: params.phoneCountry,
      phoneDialingCode: params.phoneDialingCode,
      email: params.email,
      selectedTimeSlot: selectedTimeSlot,
      selectedSlotId: selectedSlotId,
      selectedDate: sessionDate,
    });
  }, [params, navigation, selectedTimeSlot, selectedSlotId, sessionDate]);

  return {
    values: {
      service: params?.service,
      selectedTier: params?.selectedTier ?? 0,
      address: params?.address,
      floor: params?.floor,
      lat: params?.lat,
      lng: params?.lng,
      firstName: params?.firstName,
      lastName: params?.lastName,
      phone: params?.phone,
      phoneCountry: params?.phoneCountry,
      phoneDialingCode: params?.phoneDialingCode,
      email: params?.email,
      sessionTime,
      sessionDate,
      selectedTimeSlot,
      availableHours: selectedTimeSlot,
      isBookingLoading,
    },
    functions: {
      onSelectSessionTime,
      onSelectSessionDate,
      onSelectTimeSlot,
      onContinue,
      onEditAddress,
      onEditContact,
      onViewAddress,
      onEditService,
    },
  };
};

export default useServiceDateTimeController;
