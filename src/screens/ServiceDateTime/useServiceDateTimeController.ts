import {
  RouteProp,
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
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

  // State for address, contact, and other details
  const [address, setAddress] = useState<string>(params?.address || '');
  const [floor, setFloor] = useState<string>(params?.floor || '');
  const [lat, setLat] = useState<number | undefined>(params?.lat);
  const [lng, setLng] = useState<number | undefined>(params?.lng);
  const [firstName, setFirstName] = useState<string>(params?.firstName || '');
  const [lastName, setLastName] = useState<string>(params?.lastName || '');
  const [phone, setPhone] = useState<string>(params?.phone || '');
  const [phoneCountry, setPhoneCountry] = useState<string>(
    params?.phoneCountry || '',
  );
  const [phoneDialingCode, setPhoneDialingCode] = useState<string>(
    params?.phoneDialingCode || '',
  );
  const [email, setEmail] = useState<string>(params?.email || '');

  // Update ALL state when screen comes into focus (e.g., when coming back from edit)
  useFocusEffect(
    useCallback(() => {
      if (params?.selectedDate) {
        setSessionDate(params.selectedDate);
      }
      if (params?.selectedTimeSlot) {
        setSelectedTimeSlot(params.selectedTimeSlot);
      }
      if (params?.selectedSlotId) {
        setSelectedSlotId(params.selectedSlotId);
      }
      if (params?.address !== undefined) {
        setAddress(params.address);
      }
      if (params?.floor !== undefined) {
        setFloor(params.floor);
      }
      if (params?.lat !== undefined) {
        setLat(params.lat);
      }
      if (params?.lng !== undefined) {
        setLng(params.lng);
      }
      if (params?.firstName !== undefined) {
        setFirstName(params.firstName);
      }
      if (params?.lastName !== undefined) {
        setLastName(params.lastName);
      }
      if (params?.phone !== undefined) {
        setPhone(params.phone);
      }
      if (params?.phoneCountry !== undefined) {
        setPhoneCountry(params.phoneCountry);
      }
      if (params?.phoneDialingCode !== undefined) {
        setPhoneDialingCode(params.phoneDialingCode);
      }
      if (params?.email !== undefined) {
        setEmail(params.email);
      }
    }, [
      params?.selectedDate,
      params?.selectedTimeSlot,
      params?.selectedSlotId,
      params?.address,
      params?.floor,
      params?.lat,
      params?.lng,
      params?.firstName,
      params?.lastName,
      params?.phone,
      params?.phoneCountry,
      params?.phoneDialingCode,
      params?.email,
    ]),
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
      confirmedAddress: address,
      confirmedFloor: floor,
      confirmedLat: lat,
      confirmedLng: lng,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      phoneCountry: phoneCountry,
      phoneDialingCode: phoneDialingCode,
      email: email,
      selectedTimeSlot: selectedTimeSlot,
      selectedSlotId: selectedSlotId,
      selectedDate: sessionDate,
      editMode: 'address',
    });
  }, [
    params.service,
    params.selectedTier,
    address,
    floor,
    lat,
    lng,
    firstName,
    lastName,
    phone,
    phoneCountry,
    phoneDialingCode,
    email,
    navigation,
    selectedTimeSlot,
    selectedSlotId,
    sessionDate,
  ]);

  const onEditContact = useCallback(() => {
    navigation.navigate(ROUTES.BOOK_SERVICE, {
      service: params.service,
      selectedTier: params.selectedTier,
      confirmedAddress: address,
      confirmedFloor: floor,
      confirmedLat: lat,
      confirmedLng: lng,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      phoneCountry: phoneCountry,
      phoneDialingCode: phoneDialingCode,
      email: email,
      selectedTimeSlot: selectedTimeSlot,
      selectedSlotId: selectedSlotId,
      selectedDate: sessionDate,
      editMode: 'contact',
    });
  }, [
    params.service,
    params.selectedTier,
    address,
    floor,
    lat,
    lng,
    firstName,
    lastName,
    phone,
    phoneCountry,
    phoneDialingCode,
    email,
    navigation,
    selectedTimeSlot,
    selectedSlotId,
    sessionDate,
  ]);

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
          full_address: address,
          lat: lat || 0,
          lng: lng || 0,
          floor: floor || '',
        },
        contact_details: {
          first_name: firstName || '',
          last_name: lastName || '',
          country_code: phoneDialingCode || '+971',
          phone_number: phone || '',
          email: email || '',
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
          address: address,
          floor: floor,
          firstName: firstName || '',
          lastName: lastName || '',
          phone: phone || '',
          email: email || '',
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
    params.service,
    params.selectedTier,
    address,
    floor,
    lat,
    lng,
    firstName,
    lastName,
    phone,
    phoneCountry,
    phoneDialingCode,
    email,
    sessionTime,
    sessionDate,
    selectedTimeSlot,
    selectedSlotId,
    navigation,
    createBooking,
  ]);

  const onViewAddress = useCallback(() => {
    navigation.navigate(ROUTES.LOCATION_VIEW, {
      service: params.service,
      selectedTier: params.selectedTier,
      address: address,
      floor: floor,
      viewOnly: true,
    });
  }, [params.service, params.selectedTier, address, floor, navigation]);

  const onEditService = useCallback(() => {
    navigation.navigate(ROUTES.BOOK_SERVICE, {
      service: params.service,
      selectedTier: params.selectedTier,
      confirmedAddress: address,
      confirmedFloor: floor,
      confirmedLat: lat,
      confirmedLng: lng,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      phoneCountry: phoneCountry,
      phoneDialingCode: phoneDialingCode,
      email: email,
      selectedTimeSlot: selectedTimeSlot,
      selectedSlotId: selectedSlotId,
      selectedDate: sessionDate,
      editMode: 'service',
    });
  }, [
    params.service,
    params.selectedTier,
    address,
    floor,
    lat,
    lng,
    firstName,
    lastName,
    phone,
    phoneCountry,
    phoneDialingCode,
    email,
    navigation,
    selectedTimeSlot,
    selectedSlotId,
    sessionDate,
  ]);

  return {
    values: {
      service: params?.service,
      selectedTier: params?.selectedTier ?? 0,
      address,
      floor,
      lat,
      lng,
      firstName,
      lastName,
      phone,
      phoneCountry,
      phoneDialingCode,
      email,
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
