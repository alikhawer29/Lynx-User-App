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
  const [visitType, setVisitType] = useState<
    'provider_visits_user' | 'user_visits_provider'
  >('provider_visits_user');

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
      // Determine the visit type to pass
      let finalVisitType:
        | 'provider_visits_user'
        | 'user_visits_provider'
        | undefined;

      if (data.data.service_type === 'provider_visits_user') {
        finalVisitType = 'provider_visits_user';
      } else if (data.data.service_type === 'user_visits_provider') {
        finalVisitType = 'user_visits_provider';
      } else if (data.data.service_type === 'both') {
        finalVisitType = visitType; // Use the selected visit type
      }

      navigate(ROUTES.BOOK_SERVICE, {
        service: data.data,
        selectedTier: selected,
        visitType: finalVisitType,
      });
    }
  }, [authorize, data, selected, visitType, showOkModal]);

  const onSelectTier = useCallback(
    (tier: number) => {
      setSelected(tier);
    },
    [selected],
  );

  const onSelectVisitType = useCallback(
    (type: 'provider_visits_user' | 'user_visits_provider') => {
      setVisitType(type);
    },
    [],
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
      visitType,
    },
    functions: {
      onBookAppointment,
      onSelectTier,
      onSelectVisitType,
      onViewReviews,
    },
  };
};

export default useServiceDetailsController;
