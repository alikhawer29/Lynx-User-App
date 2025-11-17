import { useCallback, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useLazyGetBookingsQuery } from '../../redux/Apis/Booking';
import { MyAppointmentsStackParamList } from '../../interfaces';
import { ROUTES } from '../../utils/routes';

type MyAppointmentsNavigationProp = StackNavigationProp<
  MyAppointmentsStackParamList,
  'MyAppointments'
>;

type FilterType =
  | 'all'
  | 'pending'
  | 'cancelled'
  | 'approved'
  | 'rejected'
  | 'requested'
  | 'upcoming'
  | 'in-progress'
  | 'completed';

const FILTER_TABS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'cancelled', label: 'Cancelled' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'requested', label: 'Requested' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'in-progress', label: 'In-Progress' },
  { key: 'completed', label: 'Past' },
];

const useMyAppointmentsController = () => {
  const navigation = useNavigation<MyAppointmentsNavigationProp>();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [page, setPage] = useState(1);
  const [bookings, setBookings] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [fetchBookings, { isLoading, isFetching }] = useLazyGetBookingsQuery();

  const loadBookings = useCallback(
    async (
      filterType: FilterType,
      pageNum: number,
      append: boolean = false,
    ) => {
      try {
        const params: any = {
          page: pageNum,
          limit: 10,
        };

        // Add filter params based on selected filter
        if (filterType !== 'all') {
          if (
            filterType === 'pending' ||
            filterType === 'approved' ||
            filterType === 'rejected'
          ) {
            params.status = filterType;
          } else if (
            filterType === 'upcoming' ||
            filterType === 'in-progress'
          ) {
            params.booking_status = filterType;
          } else if (filterType === 'completed') {
            params.booking_status = 'completed';
          } else if (filterType === 'cancelled') {
            params.status = 'cancelled';
          }
        }

        const result = await fetchBookings(params).unwrap();

        if (result?.data) {
          if (append) {
            setBookings(prev => [...prev, ...result.data]);
          } else {
            setBookings(result.data);
          }

          // Check if there are more items
          setHasMore(result.data.length === 10);
        }
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    },
    [fetchBookings],
  );

  // Initial load
  useEffect(() => {
    loadBookings('all', 1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeFilter = useCallback(
    (filter: FilterType) => {
      setSelectedFilter(filter);
      setPage(1);
      setBookings([]);
      loadBookings(filter, 1, false);
    },
    [loadBookings],
  );

  const onLoadMore = useCallback(() => {
    if (!isFetching && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadBookings(selectedFilter, nextPage, true);
    }
  }, [isFetching, hasMore, page, selectedFilter, loadBookings]);

  const onRefresh = useCallback(() => {
    setPage(1);
    setBookings([]);
    loadBookings(selectedFilter, 1, false);
  }, [selectedFilter, loadBookings]);

  const onPressBooking = useCallback(
    (bookingId: string) => {
      navigation.navigate(ROUTES.APPOINTMENT_DETAILS, { bookingId });
    },
    [navigation],
  );

  return {
    values: {
      bookings,
      isLoading,
      isFetching,
      selectedFilter,
      filterTabs: FILTER_TABS,
      hasMore,
    },
    functions: {
      onChangeFilter,
      onLoadMore,
      onRefresh,
      onPressBooking,
    },
  };
};

export default useMyAppointmentsController;
