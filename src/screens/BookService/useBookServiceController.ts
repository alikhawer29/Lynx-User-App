import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useEffect, useState } from 'react';
import { ServiceStackParamList } from '../../interfaces';
import { useLazyGetSlotsByDateQuery } from '../../redux/Apis/Slot';
import { ROUTES } from '../../utils/routes';

type BookServiceRouteProp = RouteProp<ServiceStackParamList, 'BookService'>;
type BookServiceNavigationProp = StackNavigationProp<
  ServiceStackParamList,
  'BookService'
>;

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  address?: string;
}

interface TouchedFields {
  firstName: boolean;
  lastName: boolean;
  phone: boolean;
  email: boolean;
}

interface WeekDate {
  date: string; // Format: YYYY-MM-DD
  day: string; // Format: DD
  dayName: string; // Format: SUN, MON, etc.
  fullDate: Date;
}

interface SlotData {
  _id: string;
  day: string;
  start_time: string;
  end_time: string;
  is_active: boolean;
  time_range: string;
  time_range_new: string;
  id: string;
  is_booked: boolean;
  booking_info?: {
    booking_id: string;
    provider: {
      _id: string;
      first_name: string;
      last_name: string;
    };
    session_date: string;
  } | null;
}

const useBookServiceController = () => {
  const { params } = useRoute<BookServiceRouteProp>();
  const navigation = useNavigation<BookServiceNavigationProp>();

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

  // Determine initial state based on editMode
  const editMode = params?.editMode;
  const hasAddress = !!params?.confirmedAddress;
  const hasContact = !!(
    params?.firstName &&
    params?.lastName &&
    params?.phone &&
    params?.email
  );
  const hasService = !!(params?.selectedTimeSlot && params?.selectedDate);

  const [showContactDetails, setShowContactDetails] = useState(
    editMode === 'contact' ? true : !hasContact,
  );
  const [showServiceDetails, setShowServiceDetails] = useState(
    editMode === 'service' ? true : !hasService,
  );
  const [showAddress, setShowAddress] = useState(
    editMode === 'address' ? false : editMode ? true : hasAddress,
  );
  const [showFloor, setShowFloor] = useState(false);
  const [showTimeSlot, setShowTimeSlot] = useState(false);
  const [showContact, setShowContact] = useState(
    editMode === 'contact' ? false : editMode ? true : hasContact,
  );

  const [address, setAddress] = useState<string>(
    params?.confirmedAddress || '',
  );
  const [floor, setFloor] = useState<string>(params?.confirmedFloor || '');
  const [lat, setLat] = useState<number | undefined>(params?.confirmedLat);
  const [lng, setLng] = useState<number | undefined>(params?.confirmedLng);
  const [firstName, setFirstName] = useState<string>(params?.firstName || '');
  const [lastName, setLastName] = useState<string>(params?.lastName || '');
  const [phone, setPhone] = useState<string>(params?.phone || '');
  const [phoneCountry, setPhoneCountry] = useState<string>(
    params?.phoneCountry || 'AE',
  );
  const [phoneDialingCode, setPhoneDialingCode] = useState<string>(
    params?.phoneDialingCode || '+971',
  );
  const [email, setEmail] = useState<string>(params?.email || '');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(
    params?.selectedTimeSlot || '',
  );
  const [selectedSlotId, setSelectedSlotId] = useState<string>(
    params?.selectedSlotId || '',
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    params?.selectedDate || '',
  );
  const [weekDates, setWeekDates] = useState<WeekDate[]>([]);
  const [slots, setSlots] = useState<SlotData[]>([]);
  const [currentMonth, setCurrentMonth] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
  });

  const [
    fetchSlots,
    { data: slotsData, isLoading: slotsLoading, error: slotsError },
  ] = useLazyGetSlotsByDateQuery();

  // Generate next 7 days starting from today
  useEffect(() => {
    const today = new Date();
    const nextSevenDays: WeekDate[] = [];
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    // Generate 7 days starting from today
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      nextSevenDays.push({
        date: date.toISOString().split('T')[0], // YYYY-MM-DD
        day: String(date.getDate()).padStart(2, '0'),
        dayName: dayNames[date.getDay()],
        fullDate: date,
      });
    }

    setWeekDates(nextSevenDays);
    setCurrentMonth(monthNames[today.getMonth()]);

    // Only auto-select today's date if no date is already selected (not in edit mode)
    if (!params?.selectedDate) {
      const todayFormatted = today.toISOString().split('T')[0];
      setSelectedDate(todayFormatted);
    }
  }, [params?.selectedDate]);

  // Fetch slots when date is selected
  useEffect(() => {
    if (selectedDate) {
      fetchSlots(selectedDate);
    }
  }, [selectedDate, fetchSlots]);

  // Update slots when data is fetched
  useEffect(() => {
    if (slotsError) {
      console.log('Slots API Error:', JSON.stringify(slotsError, null, 2));
    }

    console.log('API Response received:', JSON.stringify(slotsData, null, 2));

    if (slotsData?.success && slotsData?.data) {
      setSlots(slotsData.data);
    } else {
      setSlots([]);
    }
  }, [slotsData, slotsError]);

  const handleChange = useCallback(
    (field: string) => (value: string) => {
      switch (field) {
        case 'address':
          setAddress(value);
          break;
        case 'floor':
          setFloor(value);
          break;
        case 'firstName':
          setFirstName(value);
          if (value.trim()) {
            setErrors(prev => ({ ...prev, firstName: undefined }));
          }
          break;
        case 'lastName':
          setLastName(value);
          if (value.trim()) {
            setErrors(prev => ({ ...prev, lastName: undefined }));
          }
          break;
        case 'phone':
          setPhone(value);
          if (value.trim()) {
            setErrors(prev => ({ ...prev, phone: undefined }));
          }
          break;
        case 'email':
          setEmail(value);
          if (value.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setErrors(prev => ({ ...prev, email: undefined }));
          }
          break;
      }
    },
    [],
  );

  const handleTouch = useCallback((field: keyof TouchedFields) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    // Only validate address if location is required
    if (isLocationRequired && !address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (phone.length < 8) {
      newErrors.phone = 'Phone number must be at least 8 digits';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      phone: true,
      email: true,
    });

    return Object.keys(newErrors).length === 0;
  }, [isLocationRequired, address, firstName, lastName, phone, email]);

  const onViewLocation = useCallback(() => {
    navigation.navigate(ROUTES.LOCATION_VIEW, {
      service: params.service,
      selectedTier: params.selectedTier,
      visitType,
      address,
      floor,
    });
  }, [params, visitType, address, floor, navigation]);

  const onEditLocation = useCallback(() => {
    setShowAddress(false);
    navigation.navigate(ROUTES.LOCATION_VIEW, {
      service: params.service,
      selectedTier: params.selectedTier,
      visitType,
      address,
      floor,
    });
  }, [params, visitType, address, floor, navigation]);

  const onEditAddress = useCallback(() => {
    setShowAddress(false);
  }, []);

  const onSelectTimeSlot = useCallback(
    (timeSlot: string, slotId: string, isBooked: boolean) => {
      // Prevent selecting booked slots
      if (isBooked) {
        return;
      }

      setSelectedTimeSlot(timeSlot);
      setSelectedSlotId(slotId);
    },
    [],
  );

  const onSelectDate = useCallback((date: string, dayName: string) => {
    setSelectedDate(date);
    setSelectedTimeSlot(''); // Reset selected time slot when date changes
    setSelectedSlotId(''); // Reset selected slot ID when date changes
  }, []);

  const onContinue = useCallback(() => {
    if (validateForm()) {
      if (editMode) {
        // When editing, navigate back to ServiceDateTime with updated data
        navigation.navigate(ROUTES.SERVICE_DATE_TIME, {
          service: params.service,
          selectedTier: params.selectedTier,
          visitType,
          address: isLocationRequired ? address : undefined,
          floor: isLocationRequired ? floor : undefined,
          lat: isLocationRequired ? lat : undefined,
          lng: isLocationRequired ? lng : undefined,
          firstName,
          lastName,
          phone,
          phoneCountry,
          phoneDialingCode,
          email,
          selectedTimeSlot,
          selectedSlotId,
          selectedDate,
        });
      } else {
        // Normal flow: navigate to ServiceDateTime
        navigation.navigate(ROUTES.SERVICE_DATE_TIME, {
          service: params.service,
          selectedTier: params.selectedTier,
          visitType,
          address: isLocationRequired ? address : undefined,
          floor: isLocationRequired ? floor : undefined,
          lat: isLocationRequired ? lat : undefined,
          lng: isLocationRequired ? lng : undefined,
          firstName,
          lastName,
          phone,
          phoneCountry,
          phoneDialingCode,
          email,
          selectedTimeSlot,
          selectedSlotId,
          selectedDate,
        });
      }
    }
  }, [
    validateForm,
    editMode,
    params,
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
    selectedTimeSlot,
    selectedSlotId,
    selectedDate,
    navigation,
  ]);

  const onEditContact = useCallback(() => {
    setShowContact(false);
  }, []);

  const onEditService = useCallback(() => {
    setShowServiceDetails(false);
  }, []);

  return {
    values: {
      service: params?.service,
      selectedTier: params?.selectedTier ?? 0,
      visitType,
      isLocationRequired,
      isLoading: false,
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
      errors,
      touched,
      selectedTimeSlot,
      selectedDate,
      weekDates,
      slots,
      currentMonth,
      slotsLoading,
      showContactDetails,
      showServiceDetails,
      showAddress,
      showFloor,
      showTimeSlot,
      showContact,
      editMode,
    },
    functions: {
      onViewLocation,
      onEditLocation,
      onContinue,
      handleChange,
      handleTouch,
      onSelectTimeSlot,
      onSelectDate,
      setPhoneCountry,
      setPhoneDialingCode,
      setShowContactDetails,
      setShowServiceDetails,
      setShowAddress,
      onEditAddress,
      setShowFloor,
      setShowTimeSlot,
      setShowContact,
      onEditContact,
      onEditService,
    },
  };
};

export default useBookServiceController;
