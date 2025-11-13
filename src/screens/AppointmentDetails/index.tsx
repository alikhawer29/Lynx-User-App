import React from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import Text from '../../components/Text';
import Wrapper from '../../components/Wrapper';
import Button from '../../components/Button';
import Image from '../../components/Image';
import colors from '../../utils/colors';
import styles from './styles';
import useAppointmentDetailsController from './useAppointmentDetailsController';
import dayjs from 'dayjs';

const AppointmentDetails = () => {
  const {
    values: {
      booking,
      isLoading,
      showRefundPolicyModal,
      showRefundReasonModal,
      showRefundSuccessModal,
      showApproveModal,
      showRejectReasonModal,
      showRejectSuccessModal,
      refundReason,
      rejectionReason,
    },
    functions: {
      onRefreshDetails,
      onPressRefund,
      onCancelRefundPolicy,
      onProceedToRefundReason,
      onCancelRefundReason,
      onConfirmRefund,
      onCloseRefundSuccess,
      onPressApprove,
      onCancelApprove,
      onConfirmApprove,
      onPressReject,
      onCancelRejectReason,
      onConfirmReject,
      onCloseRejectSuccess,
      onViewLocation,
      setRefundReason,
      setRejectionReason,
    },
  } = useAppointmentDetailsController();

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
        return { bg: 'rgba(169, 121, 38, 0.2)', text: '#A97926' };
      default:
        return { bg: '#F5F5F5', text: '#757575' };
    }
  };

  const getSubStatusColor = (subStatus: string) => {
    switch (subStatus?.toLowerCase()) {
      case 'upcoming':
        return { bg: 'rgba(76, 175, 80, 0.15)', text: '#4CAF50' };
      case 'completed':
        return { bg: '#E8F5E9', text: '#4CAF50' };
      case 'cancelled':
        return { bg: '#FFEBEE', text: '#F44336' };
      case 'no-show':
        return { bg: 'rgba(255, 193, 7, 0.15)', text: '#FFC107' };
      default:
        return { bg: '#F5F5F5', text: '#757575' };
    }
  };

  if (isLoading || !booking) {
    return (
      <Wrapper>
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ marginTop: 10, color: colors.dark_gray }}>
            Loading appointment details...
          </Text>
        </View>
      </Wrapper>
    );
  }

  const statusColors = getStatusColor(booking.status);
  const formattedDate = dayjs(booking.session_date).format('DD/MM/YYYY');
  const priceType = booking.price_type === 'normal' ? 'Normal' : 'Premium';
  const serviceName = booking.service_id?.name || '';
  const categoryName = booking.category_id?.name || '';
  const providerName = booking.provider_id
    ? `${booking.provider_id.first_name} ${booking.provider_id.last_name}`
    : 'Josh Elbert';

  // Check if reschedule request exists
  const hasRescheduleRequest = booking.status?.toLowerCase() === 'requested';


  // Check if refund button should be shown (pending status)
  const canRefund = booking.status?.toLowerCase() === 'pending';

  const subStatus = booking.sub_status || 'upcoming';
  const subStatusColors = getSubStatusColor(subStatus);

  return (
    <Wrapper>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scroll_content}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefreshDetails}
            colors={[colors.primary]}
          />
        }
      >
        {/* Service Image */}
        <Image
          // source={{ uri: booking?.service_id?.image_url || 'https://via.placeholder.com/400x200' }}
          source={{ uri: 'https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_1200,q_60/lsci/db/PICTURES/CMS/409100/409144.6.jpg' }}
          style={styles.service_image}
          resize="cover"
        />

        {/* Provider Info + Status */}
        <View style={styles.provider_row}>
          <View style={styles.provider_info}>
            <Image
              // source={{ uri: booking?.provider_id?.image_url || 'https://via.placeholder.com/400x200' }}
              source={{ uri: 'https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_1200,q_60/lsci/db/PICTURES/CMS/409100/409144.6.jpg' }}
              style={styles.provider_avatar}
              resize="cover"
            />
            <View style={styles.provider_text_container}>
              <Text style={styles.provider_label}>Service Provider</Text>
              <Text style={styles.provider_name}>{providerName}</Text>
            </View>
          </View>

          {/* <View style={[styles.status_badge, {}]}>
            <Text style={styles.provider_name}>Status :</Text>
            <Text style={[styles.status_text, { color: statusColors.text, backgroundColor: statusColors.bg }]}>
              {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
            </Text>
          </View> */}
          <View style={styles.status_badge_container}>
            <View style={styles.status_row}>
              <Text size={12} style={styles.status_label}>Status :</Text>
              <View style={[styles.status_badge, { backgroundColor: statusColors.bg }]}>
                <Text size={12} style={[styles.status_text, { color: statusColors.text }]}>
                  {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                </Text>
              </View>
            </View>
            <View style={styles.status_row}>
              <Text size={12} style={styles.status_label}>Sub-Status :</Text>
              <View style={[styles.status_badge, { backgroundColor: subStatusColors.bg }]}>
                <Text size={12} style={[styles.status_text, { color: subStatusColors.text }]}>
                  {subStatus.charAt(0).toUpperCase() + subStatus.slice(1)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Service Name */}
        <Text size={25} style={styles.service_name}>{serviceName}</Text>

        {/* Category + Price */}
        <View style={styles.category_row}>
          <Text size={13} style={styles.category_text}>Category Type: {categoryName}</Text>
          <View style={{ alignItems: 'flex-end' }}>
            <Text size={25} weight="bold" style={styles.price_text}>${booking.price}</Text>
            <Text size={10} style={styles.price_type}>{priceType} Price</Text>
          </View>
        </View>


        {/* Booking Details Section */}
        <Text size={23} style={styles.section_title}>Booking Details</Text>

        <View style={styles.details_grid}>
          <View style={styles.detail_item}>
            <Text size={16} style={styles.detail_label}>Booking ID:</Text>
            <Text size={16} style={styles.detail_value}>#{booking.booking_id || booking._id?.slice(-8)}</Text>
          </View>

          <View style={styles.detail_item}>
            <Text size={16} style={styles.detail_label}>Booking Date:</Text>
            <Text size={16} style={styles.detail_value}>{formattedDate}</Text>
          </View>

          <View style={styles.detail_item}>
            <Text size={16} style={styles.detail_label}>User Name:</Text>
            <Text size={16} style={styles.detail_value}>
              {booking.contact_details?.first_name} {booking.contact_details?.last_name}
            </Text>
          </View>

          <View style={styles.detail_item} >
            <Text size={16} style={styles.detail_label}>Phone Number</Text>
            <Text size={16} style={styles.detail_value}>
              🇺🇸 {booking.contact_details?.country_code || '+1'}-{booking.contact_details?.phone_number}
            </Text>
          </View>

          <View style={styles.detail_item}>
            <Text size={16} style={styles.detail_label}>Email Address:</Text>
            <Text size={16} style={styles.detail_value}>{booking.contact_details?.email}</Text>
          </View>

          <View style={styles.detail_item}>
            <Text size={16} style={styles.detail_label}>Location:</Text>
            <View style={styles.location_row}>
              <Text size={16} style={styles.detail_value}>
                {'Maplink'}
              </Text>
              <TouchableOpacity onPress={onViewLocation}>
                <Text size={16} style={styles.view_location_text} color='#B69D74'>View Location</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.detail_item_full}>
            <Text size={16} style={styles.detail_label}>Address:</Text>
            <Text size={16} style={styles.detail_value}>
              {booking.address?.full_address || '1234, Business St #567, State, Country.'}
            </Text>
          </View>

          <View style={styles.detail_item}>
            <Text size={16} style={styles.detail_label}>Service Date:</Text>
            <Text size={16} style={styles.detail_value}>{formattedDate}</Text>
          </View>

          <View style={styles.detail_item}>
            <Text size={16} style={styles.detail_label}>Service Time:</Text>
            <Text size={16} style={styles.detail_value}>{booking.session_time || '12:30'}</Text>
          </View>
        </View>

        {/* Service Provider Details */}
        {booking.provider_id && (
          <View style={styles.requested_section}>
            <Text size={20} style={styles.requested_title}>Service Provider Details</Text>
            <View style={styles.provider_details_grid}>
              <View style={styles.service_provider_item}>
                <Text style={styles.detail_label}>Name:</Text>
                <Text style={styles.detail_value}>
                  {booking.provider_id.first_name} {booking.provider_id.last_name}
                </Text>
              </View>
              <View style={styles.service_provider_item}>
                <Text style={styles.detail_label}>Phone Number:</Text>
                <Text style={styles.detail_value}>
                  {booking.provider_id.phone_number || '1234567890'}
                </Text>
              </View>
            </View>
            <View style={styles.provider_details_grid}>
              <View style={styles.service_provider_item_full}>
                <Text style={styles.detail_label}>Email:</Text>
                <Text style={styles.detail_value}>
                  {booking.provider_id.email}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Requested Date Details (if reschedule requested) */}
        {hasRescheduleRequest && booking.reschedule_requested && (

          <View style={styles.requested_section}>
            <Text size={20} style={styles.requested_title}>Requested Date Details</Text>
            <View style={styles.requested_details_row}>
              <View style={styles.requested_detail_item}>
                <Text style={styles.detail_label}>Service Date:</Text>
                <Text style={styles.detail_value}>
                  {dayjs(booking.proposed_session_date).format('DD/MM/YYYY')}
                </Text>
              </View>
              <View style={styles.requested_detail_item}>
                <Text style={styles.detail_label}>Service Time:</Text>
                <Text style={styles.detail_value}>
                  {booking.proposed_session_time || '12:30'}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Buttons */}
      {(canRefund || hasRescheduleRequest) && (
        <View style={styles.button_container}>
          {canRefund && !hasRescheduleRequest && (
            <Button text="Refund" onPress={onPressRefund} />
          )}

          {hasRescheduleRequest && (
            <View style={styles.button_row}>
              <View style={styles.button_half}>
                <Button text="Approve" type="secondary" onPress={onPressApprove} />
              </View>
              <View style={styles.button_half}>
                <Button text="Reject" onPress={onPressReject} />
              </View>
            </View>
          )}
        </View>
      )}

      {/* Refund Policy Modal */}
      <Modal
        visible={showRefundPolicyModal}
        transparent
        animationType="fade"
        onRequestClose={onCancelRefundPolicy}
      >
        <View style={styles.modal_overlay}>
          <View style={styles.modal_content}>
            <TouchableOpacity
              style={styles.modal_close_button}
              onPress={onCancelRefundPolicy}
            >
              <Text style={{ color: colors.white, fontSize: 16 }}>✕</Text>
            </TouchableOpacity>

            <View style={styles.modal_icon_container}>
              <View style={[styles.modal_icon_circle, { backgroundColor: '#FFEBEE' }]}>
                <Text style={{ fontSize: 32, color: '#F44336' }}>!</Text>
              </View>
            </View>

            <Text style={styles.modal_title}>Refund Policy</Text>

            <Text style={styles.policy_text}>
              Intelligent Refund Management Helped By Implementing The Two Wallet System. There Are Two Conditions:
            </Text>

            <Text style={styles.policy_text}>
              01. Happens Less Than 24 Hours Before Event, Where Half Amount Is Refunded In The Wallet, And Other Half Sent To Consultant For Example.
            </Text>

            <Text style={styles.policy_text}>
              02. Happens Less Than A Week I.e. To The 24 Hours Full Refund To The Wallet.
            </Text>

            <View style={styles.modal_button_row}>
              <View style={styles.modal_button}>
                <Button text="Refund" type="secondary" onPress={onProceedToRefundReason} />
              </View>
              <View style={styles.modal_button}>
                <Button text="Cancel" onPress={onCancelRefundPolicy} />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Refund Reason Modal */}
      <Modal
        visible={showRefundReasonModal}
        transparent
        animationType="fade"
        onRequestClose={onCancelRefundReason}
      >
        <View style={styles.modal_overlay}>
          <View style={styles.modal_content}>
            <TouchableOpacity
              style={styles.modal_close_button}
              onPress={onCancelRefundReason}
            >
              <Text style={{ color: colors.white, fontSize: 16 }}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.modal_title}>Refund Reason</Text>

            <TextInput
              style={styles.text_input}
              placeholder="Provide Refund Reason....."
              placeholderTextColor={colors.dark_gray}
              value={refundReason}
              onChangeText={setRefundReason}
              multiline
              numberOfLines={4}
            />

            <Button text="Ok" onPress={onConfirmRefund} />
          </View>
        </View>
      </Modal>

      {/* Refund Success Modal */}
      <Modal
        visible={showRefundSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={onCloseRefundSuccess}
      >
        <View style={styles.modal_overlay}>
          <View style={styles.modal_content}>
            <TouchableOpacity
              style={styles.modal_close_button}
              onPress={onCloseRefundSuccess}
            >
              <Text style={{ color: colors.white, fontSize: 16 }}>✕</Text>
            </TouchableOpacity>

            <View style={styles.modal_icon_container}>
              <View style={[styles.modal_icon_circle, { backgroundColor: '#4CAF50' }]}>
                <Text style={{ fontSize: 40, color: colors.white, fontWeight: 'bold' }}>✓</Text>
              </View>
            </View>

            <Text style={styles.modal_title}>Successfully</Text>
            <Text style={styles.modal_message}>
              Your Refund Has Been Done Successfully.
            </Text>

            <Button text="Ok" onPress={onCloseRefundSuccess} />
          </View>
        </View>
      </Modal>

      {/* Approve Confirmation Modal */}
      <Modal
        visible={showApproveModal}
        transparent
        animationType="fade"
        onRequestClose={onCancelApprove}
      >
        <View style={styles.modal_overlay}>
          <View style={styles.modal_content}>
            <TouchableOpacity
              style={styles.modal_close_button}
              onPress={onCancelApprove}
            >
              <Text style={{ color: colors.white, fontSize: 16 }}>✕</Text>
            </TouchableOpacity>

            <View style={styles.modal_icon_container}>
              <View style={[styles.modal_icon_circle, { backgroundColor: '#FFEBEE' }]}>
                <Text style={{ fontSize: 32, color: '#F44336' }}>!</Text>
              </View>
            </View>

            <Text style={styles.modal_title}>Approved</Text>
            <Text style={styles.modal_message}>
              Are You Sure You Want To Approve The Request Date?
            </Text>

            <View style={styles.modal_button_row}>
              <View style={styles.modal_button}>
                <Button text="Yes" type="secondary" onPress={onConfirmApprove} />
              </View>
              <View style={styles.modal_button}>
                <Button text="No" onPress={onCancelApprove} />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Rejection Reason Modal */}
      <Modal
        visible={showRejectReasonModal}
        transparent
        animationType="fade"
        onRequestClose={onCancelRejectReason}
      >
        <View style={styles.modal_overlay}>
          <View style={styles.modal_content}>
            <TouchableOpacity
              style={styles.modal_close_button}
              onPress={onCancelRejectReason}
            >
              <Text style={{ color: colors.white, fontSize: 16 }}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.modal_title}>Rejection Reason</Text>

            <TextInput
              style={styles.text_input}
              placeholder="Enter Rejection Reason....."
              placeholderTextColor={colors.dark_gray}
              value={rejectionReason}
              onChangeText={setRejectionReason}
              multiline
              numberOfLines={4}
            />

            <Button text="Ok" onPress={onConfirmReject} />
          </View>
        </View>
      </Modal>

      {/* Reject Success Modal */}
      <Modal
        visible={showRejectSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={onCloseRejectSuccess}
      >
        <View style={styles.modal_overlay}>
          <View style={styles.modal_content}>
            <TouchableOpacity
              style={styles.modal_close_button}
              onPress={onCloseRejectSuccess}
            >
              <Text style={{ color: colors.white, fontSize: 16 }}>✕</Text>
            </TouchableOpacity>

            <View style={styles.modal_icon_container}>
              <View style={[styles.modal_icon_circle, { backgroundColor: '#4CAF50' }]}>
                <Text style={{ fontSize: 40, color: colors.white, fontWeight: 'bold' }}>✓</Text>
              </View>
            </View>

            <Text style={styles.modal_title}>Successfully</Text>
            <Text style={styles.modal_message}>
              Appointment Has Been Rejected Successfully.
            </Text>

            <Button text="Ok" onPress={onCloseRejectSuccess} />
          </View>
        </View>
      </Modal>
    </Wrapper>
  );
};

export default AppointmentDetails;

