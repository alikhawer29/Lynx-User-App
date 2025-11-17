import { RouteProp, useRoute } from '@react-navigation/native';
import { useCallback, useState, useMemo } from 'react';
import { ServiceStackParamList } from '../../interfaces';

type RateAndReviewRouteProp = RouteProp<ServiceStackParamList, 'RateAndReview'>;

const useRateAndReviewController = () => {
  const { params } = useRoute<RateAndReviewRouteProp>();

  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [visibleReviews, setVisibleReviews] = useState(10);

  const reviews = params?.reviews || [];
  const avgRating = params?.avgRating || 0;
  const reviewCount = params?.reviewCount || 0;

  // Calculate rating distribution
  const ratingDistribution = useMemo(() => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    reviews.forEach((review: any) => {
      const rating = review.rating;
      if (rating >= 1 && rating <= 5) {
        distribution[rating as keyof typeof distribution]++;
      }
    });

    return distribution;
  }, [reviews]);

  // Calculate percentages for rating bars
  const ratingPercentages = useMemo(() => {
    const total = reviewCount || 1;
    return {
      5: (ratingDistribution[5] / total) * 100,
      4: (ratingDistribution[4] / total) * 100,
      3: (ratingDistribution[3] / total) * 100,
      2: (ratingDistribution[2] / total) * 100,
      1: (ratingDistribution[1] / total) * 100,
    };
  }, [ratingDistribution, reviewCount]);

  // Filter reviews based on selected filter
  const filteredReviews = useMemo(() => {
    if (selectedFilter === 'All') {
      return reviews;
    }
    const filterRating = parseInt(selectedFilter);
    return reviews.filter((review: any) => review.rating === filterRating);
  }, [reviews, selectedFilter]);

  // Get visible reviews (for pagination)
  const displayedReviews = useMemo(() => {
    return filteredReviews.slice(0, visibleReviews);
  }, [filteredReviews, visibleReviews]);

  const hasMoreReviews = filteredReviews.length > visibleReviews;

  const onSelectFilter = useCallback((filter: string) => {
    setSelectedFilter(filter);
    setVisibleReviews(10); // Reset pagination when filter changes
  }, []);

  const onLoadMore = useCallback(() => {
    setVisibleReviews(prev => prev + 10);
  }, []);

  return {
    values: {
      avgRating,
      reviewCount,
      ratingDistribution,
      ratingPercentages,
      selectedFilter,
      displayedReviews,
      hasMoreReviews,
    },
    functions: {
      onSelectFilter,
      onLoadMore,
    },
  };
};

export default useRateAndReviewController;
