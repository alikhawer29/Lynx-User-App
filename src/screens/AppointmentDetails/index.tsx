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
import Ratings from '../../components/Ratings';
import Badge from '../../components/Badge';
import Icon from '../../components/Icon';
import images from '../../assets/images';
import Touchable from '../../components/Touchable';

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
      isRefundLoading,
      isRescheduleLoading,
      showReportModal,
      showReportSuccessModal,
      reportText,
      reportFiles,
      showReviewModal,
      showReviewSuccessModal,
      reviewText,
      rating,
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
      onPressReportService,
      onCancelReport,
      onConfirmReport,
      onCloseReportSuccess,
      onUploadReportFiles,
      setReportText,
      setReportFiles,
      onPressReviewService,
      onCancelReview,
      onConfirmReview,
      onCloseReviewSuccess,
      setReviewText,
      setRating,
      onPressChat,
    },
  } = useAppointmentDetailsController();

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return { bg: 'rgba(253, 179, 50, 0.2)', text: '#FDB332' };
      case 'approved':
        return { bg: 'rgba(126, 191, 69, 0.2)', text: '#7EBF45' };
      case 'rejected':
        return { bg: 'rgba(255, 0, 0, 0.2)', text: '#FF0000' };
      case 'cancelled':
        return { bg: 'rgba(255, 0, 0, 0.2)', text: '#FF0000' };
      case 'requested':
        return { bg: 'rgba(169, 121, 38, 0.2)', text: '#A97926' };

      default:
        return { bg: '#F5F5F5', text: '#757575' };
    }
  };

  const getSubStatusColor = (subStatus: string) => {
    switch (subStatus?.toLowerCase()) {
      case 'upcoming':
        return { bg: 'rgba(129, 159, 45, 0.2)', text: '#819F2D' };
      case 'in_progress':
        return { bg: 'rgba(248, 100, 0, 0.2)', text: '#F86400' };
      case 'completed':
        return { bg: 'rgba(0, 225, 15, 0.2)', text: '#00E10F' };
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

  const providerPhoneNumber = booking.provider_id?.dialing_code + booking.provider_id?.phone || '';

  const canReportService = booking.is_reported;

  const hasReviews = booking.reviews && booking.reviews.length > 0;

  const subStatus = booking.booking_status || 'upcoming';
  const subStatusColors = getSubStatusColor(subStatus);

  const canShowReviewAndReport = booking.booking_status?.toLowerCase() === 'completed';
  const canRefund =
    booking.status?.toLowerCase() === 'pending' ||
    (booking.status?.toLowerCase() === 'approved' &&
      booking.booking_status?.toLowerCase() === 'upcoming');

  // 3. Reschedule approve/reject buttons - show when status is "requested"
  const hasRescheduleRequest = booking.status?.toLowerCase() === 'requested';

  const canChat = booking.status?.toLowerCase() === 'approved' && booking.booking_status?.toLowerCase() === 'in_progress';

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
          source={{ uri: booking?.service_id?.image_url || 'https://via.placeholder.com/400x200' }}
          style={styles.service_image}
          resize="cover"
        />

        {/* Provider Info + Status */}
        <View style={styles.provider_row}>
          <View style={styles.provider_info}>
            <Image
              source={{ uri: booking?.provider_id?.image_url || 'https://via.placeholder.com/400x200' }}
              style={styles.provider_avatar}
              resize="cover"
            />
            <View style={styles.provider_text_container}>
              <Text style={styles.provider_label} size={16}>Service Provider</Text>
              <Text style={styles.provider_name} size={14}>{providerName}</Text>
            </View>
          </View>

          <View style={styles.status_badge_container}>
            <View style={styles.status_row}>
              <Text size={13} style={styles.status_label}>Status :</Text>
              <View style={[styles.status_badge, { backgroundColor: statusColors.bg }]}>
                <Text size={13} color={statusColors.text} style={[styles.status_text]}>
                  {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                </Text>
              </View>
            </View>
            {booking.status === 'approved' &&
              <View style={styles.status_row}>
                <Text size={13} style={styles.status_label}>Sub-Status :</Text>
                <View style={[styles.status_badge, { backgroundColor: subStatusColors.bg }]}>
                  <Text size={13} color={subStatusColors.text} style={[styles.status_text]}>
                    {/* {subStatus.charAt(0).toUpperCase() + subStatus.slice(1)} */}
                    {subStatus === 'in_progress'
                      ? 'In-Progress'
                      : subStatus?.charAt(0).toUpperCase() + subStatus?.slice(1)
                    }
                  </Text>
                </View>
              </View>
            }
          </View>
        </View>

        {/* Service Name */}
        <Text style={styles.service_name}  >{serviceName}</Text>

        {/* Category + Price */}
        <View style={styles.category_row}>
          <Badge text={`Category Type: ${categoryName}`} size={13} />
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.price_text}>${booking.price}</Text>
            <Text size={10} style={styles.price_type}>{priceType} Price</Text>
          </View>
        </View>

        {canChat &&
          <Touchable
            onPress={onPressChat}
            disabled={!canChat}
            style={[
              styles.chat_button,
              !canChat && styles.chat_button_disabled
            ]}
          >
            <Icon
              source={images.chat}
              size={30}
              tint_color={canChat ? colors.primary : colors.medium_gray}
            />
            <Text
              size={18}
              style={[
                styles.chat_text,
                !canChat && styles.chat_text_disabled
              ]}
            >
              Start Chat
            </Text>
          </Touchable>
        }

        {/* Booking Details Section */}
        <Text style={styles.section_title}>Booking Details</Text>

        <View style={styles.details_grid}>
          <View style={styles.detail_item}>
            <Text style={styles.detail_label}>Booking ID:</Text>
            <Text style={styles.detail_value}>#{booking.booking_id || booking._id?.slice(-8)}</Text>
          </View>

          <View style={styles.detail_item}>
            <Text style={styles.detail_label}>Booking Date:</Text>
            <Text style={styles.detail_value}>{formattedDate}</Text>
          </View>

          <View style={styles.detail_item}>
            <Text style={styles.detail_label}>User Name:</Text>
            <Text style={styles.detail_value}>
              {booking.contact_details?.first_name} {booking.contact_details?.last_name}
            </Text>
          </View>

          <View style={styles.detail_item} >
            <Text style={styles.detail_label}>Phone Number</Text>
            <Text style={styles.detail_value}>
              {booking.contact_details?.country_code || '+1'}-{booking.contact_details?.phone_number}
            </Text>
          </View>

          <View style={styles.detail_item}>
            <Text style={styles.detail_label}>Email Address:</Text>
            <Text style={styles.detail_value}>{booking.contact_details?.email}</Text>
          </View>

          <View style={styles.detail_item}>
            <Text style={styles.detail_label}>Location:</Text>
            <View style={styles.location_row}>
              <Text style={styles.detail_value}>
                {'Maplink'}
              </Text>
              <TouchableOpacity onPress={onViewLocation}>
                <Text style={styles.view_location_text} >View Location</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.detail_item_full}>
            <Text style={styles.detail_label}>Address:</Text>
            <Text style={styles.detail_value}>
              {booking.address?.full_address || '1234, Business St #567, State, Country.'}
            </Text>
          </View>

          <View style={styles.detail_item}>
            <Text style={styles.detail_label}>Service Date:</Text>
            <Text style={styles.detail_value}>{formattedDate}</Text>
          </View>

          <View style={styles.detail_item}>
            <Text style={styles.detail_label}>Service Time:</Text>
            <Text style={styles.detail_value}>{booking.session_time || '12:30'}</Text>
          </View>
        </View>

        {/* Service Provider Details */}
        {booking.provider_id && (
          <View style={styles.service_provider_section}>
            <Text style={styles.service_provider_title}>Service Provider Details</Text>
            <View style={styles.service_provider_details_row}>
              <View style={styles.service_provider_item}>
                <Text style={styles.detail_label}>Name:</Text>
                <Text style={styles.detail_value}>
                  {booking.provider_id.first_name} {booking.provider_id.last_name}
                </Text>
              </View>
              <View style={styles.service_provider_item}>
                <Text style={styles.detail_label}>Phone Number:</Text>
                <Text style={styles.detail_value}>
                  {providerPhoneNumber}
                </Text>
              </View>
            </View>
            <View style={styles.service_provider_details_row}>
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
            <Text style={styles.requested_title}>Requested Date Details</Text>
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

        {/* here i want to show reviews if has reviews */}
        {hasReviews && (
          <View style={styles.reviews_section}>
            <Text size={20} style={styles.reviews_title}>Rating</Text>
            <Ratings rating={booking.rating} review_count={booking.review_count} size={14} />
            {booking.reviews.map((review: any) => (
              <View key={review._id} style={styles.review_item}>
                <Text size={16} style={styles.review_text}>{review.review}</Text>
              </View>
            ))}
          </View>
        )}

      </ScrollView>

      {/* Bottom Buttons - Refund or Reschedule Actions */}
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

      {/* Review and Report Buttons - Show only when booking_status is "approved" */}
      {canShowReviewAndReport && (
        <View style={styles.button_container}>
          <View style={styles.button_row}>
            {/* Show Review button only if NO reviews */}
            {!hasReviews && (
              <View style={styles.button_half}>
                <Button
                  text="Review Service"
                  type="secondary"
                  onPress={onPressReviewService}
                />
              </View>
            )}

            {/* Show Report button only if NOT reported */}
            {!canReportService && (
              <View style={styles.button_half}>
                <Button
                  text="Report Service"
                  onPress={onPressReportService}
                />
              </View>
            )}
          </View>
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
              <Text color='white' style={{ color: colors.white, fontSize: 16 }}>✕</Text>
            </TouchableOpacity>

            <View style={styles.modal_icon_container}>
              <View style={[styles.modal_icon_circle, { backgroundColor: '#FF4444' }]}>
                <Text size={35} color={'white'}>!</Text>
              </View>
            </View>

            <Text style={styles.modal_title} size={23} position="center">Refund Policy</Text>

            <Text style={styles.policy_text} position="center">
              Intelligent Refund Management Helped By Implementing The Two Wallet System. There Are Two Conditions:
            </Text>

            <Text style={styles.policy_text} position="center">
              01. Happens Less Than 24 Hours Before Event, Where Half Amount Is Refunded In The Wallet, And Other Half Sent To Consultant For Example.
            </Text>

            <Text style={styles.policy_text} position="center">
              02. Happens Less Than A Week I.e. To The 24 Hours Full Refund To The Wallet.
            </Text>

            <View style={styles.modal_button_row}>
              <View style={styles.modal_button}>
                <Button text="Refund" onPress={onProceedToRefundReason} />
              </View>
              <View style={styles.modal_button}>
                <Button text="Cancel" type="secondary" onPress={onCancelRefundPolicy} />
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

      {/* Report Service Modal */}
      <Modal
        visible={showReportModal}
        transparent
        animationType="fade"
        onRequestClose={onCancelReport}
      >
        <View style={styles.modal_overlay}>
          <View style={styles.modal_content}>
            <TouchableOpacity
              style={styles.modal_close_button}
              onPress={onCancelReport}
            >
              <Text style={{ color: colors.white, fontSize: 16 }}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.modal_title} position='center'>Report Details</Text>

            <View style={styles.input_container}>
              <Text style={styles.input_label}>Report</Text>
              <TextInput
                style={styles.text_area}
                placeholder="..."
                placeholderTextColor={colors.medium_gray}
                multiline
                numberOfLines={6}
                value={reportText}
                onChangeText={setReportText}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity
              style={styles.upload_button}
              onPress={onUploadReportFiles}
            >
              <Text style={styles.upload_icon}>📎</Text>
              <Text style={styles.upload_text}>
                {reportFiles.length > 0
                  ? `${reportFiles.length} file(s) selected`
                  : 'Upload Files (PDF, Docx, JPG)'}
              </Text>
            </TouchableOpacity>

            {reportFiles.length > 0 && (
              <View style={styles.files_list}>
                {reportFiles.map((file, index) => (
                  <Text key={index} style={styles.file_name}>
                    {file.name}
                  </Text>
                ))}
              </View>
            )}

            <View style={styles.button_row}>
              <View style={styles.button_half}>
                <Button text="Report" onPress={onConfirmReport} />
              </View>
              <View style={styles.button_half}>
                <Button text="Cancel" type="secondary" onPress={onCancelReport} />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Report Success Modal */}
      <Modal
        visible={showReportSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={onCloseReportSuccess}
      >
        <View style={styles.modal_overlay}>
          <View style={styles.modal_content}>
            <TouchableOpacity
              style={styles.modal_close_button}
              onPress={onCloseReportSuccess}
            >
              <Text color='white' style={{ color: colors.white, fontSize: 16 }}>✕</Text>
            </TouchableOpacity>

            <View style={styles.modal_icon_container}>
              <View style={[styles.modal_icon_circle, { backgroundColor: '#6BB577' }]}>
                <Text size={25} color='white' style={{ fontSize: 40, color: colors.white, fontWeight: 'bold' }}>✓</Text>
              </View>
            </View>

            <Text style={styles.modal_title} size={23} position='center'>Submitted</Text>
            <Text style={styles.modal_message} size={12} color='#666666' position='center'>
              Booking Has Been Reported. Your Report Against This Booking Has Been Submitted To The Admin.
            </Text>

            <Button text="Ok" onPress={onCloseReportSuccess} />
          </View>
        </View>
      </Modal>

      {/* Review Service Modal */}
      <Modal
        visible={showReviewModal}
        transparent
        animationType="fade"
        onRequestClose={onCancelReview}
      >
        <View style={styles.modal_overlay}>
          <View style={styles.modal_content}>
            <TouchableOpacity
              style={styles.modal_close_button}
              onPress={onCancelReview}
            >
              <Text style={{ color: colors.white, fontSize: 16 }}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.modal_title}>Rate Service</Text>

            {/* Star Rating */}
            <View style={styles.star_container}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                >
                  <Text style={styles.star}>
                    {star <= rating ? '⭐' : '☆'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.input_container}>
              <Text style={styles.input_label}>Review</Text>
              <TextInput
                style={styles.text_area}
                placeholder="Write A Review..."
                placeholderTextColor={colors.medium_gray}
                multiline
                numberOfLines={6}
                value={reviewText}
                onChangeText={setReviewText}
                textAlignVertical="top"
              />
            </View>

            <Button text="Ok" onPress={onConfirmReview} />
          </View>
        </View>
      </Modal>

      {/* Review Success Modal */}
      <Modal
        visible={showReviewSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={onCloseReviewSuccess}
      >
        <View style={styles.modal_overlay}>
          <View style={styles.modal_content}>
            <TouchableOpacity
              style={styles.modal_close_button}
              onPress={onCloseReviewSuccess}
            >
              <Text style={{ color: colors.white, fontSize: 16 }} color={'white'}>✕</Text>
            </TouchableOpacity>

            <View style={styles.modal_icon_container}>
              <View style={[styles.modal_icon_circle, { backgroundColor: '#6BB577' }]}>
                <Text color='white' size={25} style={{ fontSize: 40, color: colors.white, fontWeight: 'bold' }}>✓</Text>
              </View>
            </View>

            <Text style={styles.modal_title} size={23} position={"center"}>Submitted</Text>
            <Text style={styles.modal_message} position={"center"}>
              Review Has Been Submitted.
            </Text>

            <Button text="Ok" onPress={onCloseReviewSuccess} />
          </View>
        </View>
      </Modal>
    </Wrapper >
  );
};

export default AppointmentDetails;

