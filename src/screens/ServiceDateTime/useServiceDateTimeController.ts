import {
  RouteProp,
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useState } from 'react';
import { ServiceStackParamList } from '../../interfaces';
import { ROUTES, NAVIGATORS } from '../../utils/routes';
import {
  useCreateBookingMutation,
  useCreatePaymentIntentMutation,
  useUpdatePaymentStatusMutation,
} from '../../redux/Apis/Booking';
import dayjs from 'dayjs';
import { useStripe } from '@stripe/stripe-react-native';
import { Alert } from 'react-native';
import { navigationRef } from '../../utils/navigation';
import { CommonActions } from '@react-navigation/native';

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
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [createPaymentIntent, { isLoading: isCreatingIntent }] =
    useCreatePaymentIntentMutation();
  const [updatePaymentStatus] = useUpdatePaymentStatusMutation();

  // Get visitType from params or determine from service_type
  const visitType =
    params?.visitType ||
    (params?.service?.service_type === 'provider_visits_user'
      ? 'provider_visits_user'
      : params?.service?.service_type === 'user_visits_provider'
      ? 'user_visits_provider'
      : 'provider_visits_user'); // default

  // Check if location is required based on visitType
  const isLocationRequired = visitType === 'provider_visits_user';

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

  // Payment-related state
  const [bookingId, setBookingId] = useState<string>('');
  const [bookingNumber, setBookingNumber] = useState<string>('');
  const [paymentId, setPaymentId] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentSheetReady, setPaymentSheetReady] = useState<boolean>(false);

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
      visitType,
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
    visitType,
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
      visitType,
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
    visitType,
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

  // Create booking and initialize payment
  const onContinue = useCallback(async () => {
    if (isProcessing) return;

    setIsProcessing(true);

    try {
      // Step 1: Create booking
      const timeMatch = selectedTimeSlot.match(/(\d{2}:\d{2})/);
      const sessionTimeFormatted = timeMatch ? timeMatch[1] : '00:00';
      const sessionDateFormatted = dayjs(sessionDate, 'DD/MM/YYYY').format(
        'YYYY-MM-DD',
      );

      const bookingPayload: any = {
        service_id: params.service._id,
        category_id: params.service.category._id || params.service._id,
        price_type: params.selectedTier === 0 ? 'normal' : 'premium',
        price:
          params.selectedTier === 0
            ? params.service.category.price.normal
            : params.service.category.price.premium,
        visit_type: visitType,
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

      console.log(bookingPayload, 'bookingPayload');

      // Only include address if location is required
      if (isLocationRequired) {
        bookingPayload.address = {
          full_address: address,
          lat: lat || 0,
          lng: lng || 0,
          floor: floor || '',
        };
      }

      const bookingResult = await createBooking(bookingPayload).unwrap();

      if (!bookingResult?.data?._id) {
        throw new Error('Failed to create booking');
      }

      const createdBookingId = bookingResult.data._id;
      const createdBookingNumber =
        bookingResult.data.booking_id || bookingResult.data._id;

      setBookingId(createdBookingId);
      setBookingNumber(createdBookingNumber);

      // Step 2: Create payment intent
      const paymentIntentResult = await createPaymentIntent({
        booking_id: createdBookingId,
      }).unwrap();

      if (!paymentIntentResult?.data?.clientSecret) {
        throw new Error('Failed to create payment intent');
      }

      setPaymentId(paymentIntentResult.data.paymentId);

      // Step 3: Initialize payment sheet
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: 'Lynx Consultancy',
        paymentIntentClientSecret: paymentIntentResult.data.clientSecret,
        defaultBillingDetails: {
          name: params?.service?.category?.name || 'Customer',
        },
        returnURL: 'lynx://payment-complete',
      });

      if (initError) {
        console.error('Error initializing payment sheet:', initError);
        Alert.alert('Error', 'Failed to initialize payment. Please try again.');
        setIsProcessing(false);
        return;
      }

      setPaymentSheetReady(true);

      // Step 4: Present payment sheet
      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        console.error('Payment failed:', presentError);
        setIsProcessing(false);

        if (presentError.code === 'Canceled') {
          console.log('Payment canceled by user');
        } else {
          Alert.alert(
            'Payment Failed',
            presentError.message || 'Something went wrong. Please try again.',
          );
        }
      } else {
        // Payment successful
        console.log('Payment successful!');

        // Update payment status in backend
        try {
          await updatePaymentStatus({
            id: paymentIntentResult.data.paymentId,
            payment_status: 'succeeded',
            payment_method: 'card',
          }).unwrap();
        } catch (updateError) {
          console.error('Failed to update payment status:', updateError);
        }

        setIsProcessing(false);
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Booking/Payment error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      setIsProcessing(false);
      Alert.alert('Error', 'Failed to process booking. Please try again.');
    }
  }, [
    isProcessing,
    params.service,
    params.selectedTier,
    address,
    floor,
    lat,
    lng,
    firstName,
    lastName,
    phone,
    phoneDialingCode,
    email,
    sessionDate,
    selectedTimeSlot,
    selectedSlotId,
    createBooking,
    createPaymentIntent,
    initPaymentSheet,
    presentPaymentSheet,
    updatePaymentStatus,
  ]);

  const onViewAddress = useCallback(() => {
    navigation.navigate(ROUTES.LOCATION_VIEW, {
      service: params.service,
      selectedTier: params.selectedTier,
      visitType,
      address: address,
      floor: floor,
      viewOnly: true,
    });
  }, [
    params.service,
    params.selectedTier,
    visitType,
    address,
    floor,
    navigation,
  ]);

  const onEditService = useCallback(() => {
    navigation.navigate(ROUTES.BOOK_SERVICE, {
      service: params.service,
      selectedTier: params.selectedTier,
      visitType,
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
    visitType,
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

  // Handle success modal OK button - navigate to My Appointments
  const onSuccessOk = useCallback(() => {
    setShowSuccessModal(false);

    // Reset navigation to My Appointments to prevent going back to payment screen
    if (navigationRef.isReady()) {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: NAVIGATORS.MY_APPOINTMENTS_STACK,
            },
          ],
        }),
      );
    }
  }, []);

  return {
    values: {
      service: params?.service,
      selectedTier: params?.selectedTier ?? 0,
      visitType,
      isLocationRequired,
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
      isProcessing,
      showSuccessModal,
      bookingNumber,
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
      onSuccessOk,
    },
  };
};

export default useServiceDateTimeController;
