import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { useModal } from '../../contexts/ModalContext';
import { useAppSelector } from '../../hooks';
import { ServiceStackParamList } from '../../interfaces';
import { useGetServicesQuery } from '../../redux/Apis/Service';
import { selectLoggedIn } from '../../redux/Slices/AuthSlice';
import { NAVIGATORS, ROUTES } from '../../utils/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { navigate, navigationRef } from '../../utils/navigation';

type ServiceDetailsRouteProp = RouteProp<
  ServiceStackParamList,
  'ServiceDetails'
>;

type BookServiceNavigationProp = StackNavigationProp<
  ServiceStackParamList,
  'BookService'
>;

const useServiceDetailsController = () => {
  const authorize = useAppSelector(selectLoggedIn);
  const { params } = useRoute<ServiceDetailsRouteProp>();

  const { showOkModal } = useModal();

  const [selected, setSelected] = useState<number>(0);

  const { data, isFetching: isLoading } = useGetServicesQuery(
    { id: params?.id },
    { skip: !params?.id },
  );

  const onBookAppointment = useCallback(() => {
    if (!authorize) {
      showOkModal({
        type: 'success',
        title: 'Login',
        message: 'You have to login first',
      });
    } else if (data?.data) {
      navigate(ROUTES.BOOK_SERVICE, {
        service: data.data,
        selectedTier: selected,
      });
    }
  }, [authorize, data, selected, showOkModal]);

  const onSelectTier = useCallback(
    (tier: number) => {
      setSelected(tier);
    },
    [selected],
  );

  const onViewReviews = useCallback(() => {
    if (data?.data && data.data.reviews && data.data.reviews.length > 0) {
      navigate(ROUTES.RATE_AND_REVIEW, {
        serviceId: data.data._id,
        reviews: data.data.reviews,
        avgRating: data.data.avg_rating || data.data.rating || 0,
        reviewCount: data.data.review_count || 0,
      });
    }
  }, [data]);

  return {
    values: {
      data: data?.data || null,
      isLoading,
      selected,
    },
    functions: {
      onBookAppointment,
      onSelectTier,
      onViewReviews,
    },
  };
};

export default useServiceDetailsController;
