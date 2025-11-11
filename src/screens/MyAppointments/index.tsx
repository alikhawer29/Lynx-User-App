import React from 'react';
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Text from '../../components/Text';
import Wrapper from '../../components/Wrapper';
import Button from '../../components/Button';
import colors from '../../utils/colors';
import styles from './styles';
import useMyAppointmentsController from './useMyAppointmentsController';
import dayjs from 'dayjs';

const MyAppointments = () => {
  const {
    values: { bookings, isLoading, isFetching, selectedFilter, filterTabs, hasMore },
    functions: { onChangeFilter, onLoadMore, onRefresh },
  } = useMyAppointmentsController();

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return { bg: 'rgba(253, 179, 50, 0.2)', text: '#FDB332' };
      case 'approved':
        return { bg: '#E8F5E9', text: '#4CAF50' };
      case 'rejected':
        return { bg: '#FFEBEE', text: '#F44336' };
      case 'cancelled':
        return { bg: '#FFEBEE', text: '#F44336' };
      case 'requested':
        return { bg: '#E3F2FD', text: '#2196F3' };
      default:
        return { bg: '#F5F5F5', text: '#757575' };
    }
  };

  const getBookingStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'upcoming':
        return { bg: '#E3F2FD', text: '#2196F3' };
      case 'in-progress':
        return { bg: '#FFF4E5', text: '#FF9800' };
      case 'completed':
        return { bg: '#E8F5E9', text: '#4CAF50' };
      default:
        return { bg: '#F5F5F5', text: '#757575' };
    }
  };

  const renderBookingCard = ({ item }: { item: any }) => {
    const statusColors = getStatusColor(item.status);
    const bookingStatusColors = getBookingStatusColor(item.booking_status);
    const formattedDate = dayjs(item.session_date).format('DD/MM/YYYY');
    const priceType = item.price_type === 'normal' ? 'Normal' : 'Premium';

    return (
      <View style={styles.booking_card}>
        {/* DATE + STATUS */}
        <View style={styles.booking_header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.booking_date}>{formattedDate}</Text>
          </View>

          <View style={[styles.status_badge, { backgroundColor: statusColors.bg }]}>
            <Text style={[styles.status_text, { color: statusColors.text }]}>
              {item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
            </Text>
          </View>
        </View>

        {/* BOOKING ID */}
        <Text style={styles.label_text}>Booking ID: #{item.booking_id || item._id?.slice(-6)}</Text>

        {/* SERVICE NAME */}
        {/* <Text style={styles.label_text}>{item.service?.name || item.category?.name}</Text> */}

        <View style={styles.booking_header}>
          {/* PRICE */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.label_text}>
              {priceType} Charges: <Text style={{ fontWeight: '700' }}>${item.price}</Text>
            </Text>
          </View>

          {/* SUB STATUS */}
          {item?.payment_status === 'paid' && item.booking_status && (
            <>
              {/* <Text style={styles.sub_status_label}>Sub-Status: </Text> */}
              <View style={[styles.status_badge, { backgroundColor: bookingStatusColors.bg }]}>
                <Text style={[styles.sub_status_value, { color: bookingStatusColors.text }]}>
                  {item.booking_status?.charAt(0).toUpperCase() + item.booking_status?.slice(1)}
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
    );
  };


  const renderFilterTabs = () => (
    <View style={styles.filter_container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filter_scroll}
      >
        {filterTabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.filter_tab,
              selectedFilter === tab.key && styles.filter_tab_active,
            ]}
            onPress={() => onChangeFilter(tab.key)}
          >
            <Text
              style={[
                styles.filter_text,
                selectedFilter === tab.key && styles.filter_text_active,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ marginTop: 10, color: colors.dark_gray }}>
            Loading appointments...
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.empty_container}>
        <Text style={styles.empty_text}>No appointments found</Text>
      </View>
    );
  };

  const renderFooter = () => {
    if (!hasMore || bookings.length === 0) return null;

    if (isFetching) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      );
    }

    return (
      <Button
        text="Load More"
        type="secondary"
        style={styles.load_more_button}
        onPress={onLoadMore}
      />
    );
  };

  return (
    <Wrapper>
      {renderFilterTabs()}
      <FlatList
        data={bookings}
        renderItem={renderBookingCard}
        keyExtractor={(item, index) => item._id || index.toString()}
        contentContainerStyle={styles.list_container}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={isLoading && bookings.length > 0}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
      />
    </Wrapper>
  );
};

export default MyAppointments;

