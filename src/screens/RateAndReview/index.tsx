import React from 'react';
import { View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Text from '../../components/Text';
import Wrapper from '../../components/Wrapper';
import Image from '../../components/Image';
import styles from './styles';
import useRateAndReviewController from './useRateAndReviewController';
import dayjs from 'dayjs';

const RateAndReview = () => {
  const {
    values: {
      avgRating,
      reviewCount,
      ratingPercentages,
      selectedFilter,
      displayedReviews,
      hasMoreReviews,
    },
    functions: { onSelectFilter, onLoadMore },
  } = useRateAndReviewController();

  const renderStars = (rating: number) => {
    return (
      <View style={styles.review_stars}>
        {[1, 2, 3, 4, 5].map(star => (
          <Text key={star} style={styles.star}>
            {star <= rating ? '⭐' : ''}
          </Text>
        ))}
      </View>
    );
  };

  const renderReviewCard = ({ item }: { item: any }) => {
    const userName =
      `${item.user?.first_name || ''} ${item.user?.last_name || ''}`.trim() ||
      'Anonymous';
    const userInitial = userName.charAt(0).toUpperCase();
    const reviewDate = dayjs(item.createdAt).format('DD-MMM-YYYY');

    return (
      <View style={styles.review_card}>
        <View style={styles.review_header}>
          {item.user?.image_url ? (
            <Image
              source={{ uri: item.user.image_url }}
              style={styles.user_avatar}
              resize="cover"
            />
          ) : (
            <View
              style={[
                styles.user_avatar,
                { justifyContent: 'center', alignItems: 'center' },
              ]}
            >
              <Text
                style={{ fontSize: 20, fontWeight: 'bold', color: '#999999' }}
              >
                {userInitial}
              </Text>
            </View>
          )}
          <View style={styles.review_user_info}>
            <Text size={16} weight="bold" style={styles.review_user_name}>
              {userName}
            </Text>
            {renderStars(item.rating)}
            <Text size={12} color="#666666" style={styles.review_text}>
              {item.review}
            </Text>
          </View>
          <Text size={12} color="#666666" style={styles.review_date}>
            {reviewDate}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Wrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section with Rating Summary */}
        <View style={styles.header_section}>
          {/* Rating Bars */}
          <View style={styles.rating_bars_container}>
            {[5, 4, 3, 2, 1].map(star => (
              <View key={star} style={styles.rating_bar_row}>
                <Text style={styles.rating_label}>{star} star</Text>
                <View style={styles.rating_bar_background}>
                  <View
                    style={[
                      styles.rating_bar_fill,
                      {
                        width: `${
                          ratingPercentages[
                            star as keyof typeof ratingPercentages
                          ]
                        }%`,
                      },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>

          {/* Rating Title */}
          <View style={styles.rating_title_container}>
            <Text style={styles.rating_title}>
              {avgRating.toFixed(1)}
              <Text style={styles.rating_count_text}>/5</Text>{' '}
              <Text style={styles.rating_count_text}>({reviewCount})</Text>
            </Text>
          </View>
        </View>

        {/* Filter Section */}
        <View style={styles.filter_section}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filter_scroll}
          >
            <TouchableOpacity
              style={[
                styles.filter_button,
                selectedFilter === 'All' && styles.filter_button_active,
              ]}
              onPress={() => onSelectFilter('All')}
            >
              <Text color={selectedFilter === 'All' ? '#FFFFFF' : '#B0B3C7'}>
                All
              </Text>
            </TouchableOpacity>
            {[5, 4, 3, 2, 1].map(star => (
              <TouchableOpacity
                key={star}
                style={[
                  styles.filter_button,
                  selectedFilter === star.toString() &&
                    styles.filter_button_active,
                ]}
                onPress={() => onSelectFilter(star.toString())}
              >
                <Text
                  color={
                    selectedFilter === star.toString() ? '#FFFFFF' : '#B0B3C7'
                  }
                  style={styles.filter_button_text}
                >
                  ⭐ {star}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Reviews List */}
        <View style={styles.reviews_list}>
          {displayedReviews.length > 0 ? (
            <>
              <FlatList
                data={displayedReviews}
                renderItem={renderReviewCard}
                keyExtractor={item => item._id || item.id}
                scrollEnabled={false}
              />
              {hasMoreReviews && (
                <TouchableOpacity
                  style={styles.load_more_button}
                  onPress={onLoadMore}
                >
                  <Text style={styles.load_more_text}>Load More</Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <View style={styles.empty_container}>
              <Text style={styles.empty_text}>No reviews found</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default RateAndReview;
