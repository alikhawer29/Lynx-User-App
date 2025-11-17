import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useEffect, useState } from 'react';
import { ServiceStackParamList } from '../../interfaces';
import { ROUTES } from '../../utils/routes';
import { useLazyGetSlotsByDateQuery } from '../../redux/Apis/Slot';
import { BASE_URL } from '../../utils/data';

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
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [showServiceDetails, setShowServiceDetails] = useState(false);

  const { params } = useRoute<BookServiceRouteProp>();
  const navigation = useNavigation<BookServiceNavigationProp>();

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

  // Generate current week dates
  useEffect(() => {
    const today = new Date();
    const currentWeek: WeekDate[] = [];
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

    // Get the start of the week (Sunday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);

      currentWeek.push({
        date: date.toISOString().split('T')[0], // YYYY-MM-DD
        day: String(date.getDate()).padStart(2, '0'),
        dayName: dayNames[date.getDay()],
        fullDate: date,
      });
    }

    setWeekDates(currentWeek);
    setCurrentMonth(monthNames[today.getMonth()]);
    // Auto-select today's date if it's not Sunday, otherwise select next available day
    const todayFormatted = today.toISOString().split('T')[0];
    const todayDayName = dayNames[today.getDay()];

    if (todayDayName === 'SUN') {
      // If today is Sunday, select Monday (next day)
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
      setSelectedDate(tomorrowFormatted);
    } else {
      setSelectedDate(todayFormatted);
    }
  }, []);

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

    if (!address.trim()) {
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
  }, [address, firstName, lastName, phone, email]);

  const onViewLocation = useCallback(() => {
    navigation.navigate(ROUTES.LOCATION_VIEW, {
      service: params.service,
      selectedTier: params.selectedTier,
      address,
      floor,
    });
  }, [params, address, floor, navigation]);

  const onEditLocation = useCallback(() => {
    navigation.navigate(ROUTES.LOCATION_VIEW, {
      service: params.service,
      selectedTier: params.selectedTier,
      address,
      floor,
    });
  }, [params, address, floor, navigation]);

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
    // Prevent selecting Sundays
    if (dayName === 'SUN') {
      return;
    }

    setSelectedDate(date);
    setSelectedTimeSlot(''); // Reset selected time slot when date changes
    setSelectedSlotId(''); // Reset selected slot ID when date changes
  }, []);

  const onContinue = useCallback(() => {
    if (validateForm()) {
      navigation.navigate(ROUTES.SERVICE_DATE_TIME, {
        service: params.service,
        selectedTier: params.selectedTier,
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
      });
    }
  }, [
    validateForm,
    params,
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

  return {
    values: {
      service: params?.service,
      selectedTier: params?.selectedTier ?? 0,
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
    },
  };
};

export default useBookServiceController;
