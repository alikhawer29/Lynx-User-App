import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useState, useEffect } from 'react';
import { MyAppointmentsStackParamList } from '../../interfaces';
import {
  useLazyGetBookingDetailsQuery,
  useRequestRefundMutation,
  useRescheduleResponseMutation,
  useReportBookingMutation,
  useReviewBookingMutation,
} from '../../redux/Apis/Booking';
import { openMultipleImagePicker } from '../../utils/picker';
import { formHandler } from '../../utils/helper';

type AppointmentDetailsRouteProp = RouteProp<
  MyAppointmentsStackParamList,
  'AppointmentDetails'
>;
type AppointmentDetailsNavigationProp = StackNavigationProp<
  MyAppointmentsStackParamList,
  'AppointmentDetails'
>;

const useAppointmentDetailsController = () => {
  const { params } = useRoute<AppointmentDetailsRouteProp>();
  const navigation = useNavigation<AppointmentDetailsNavigationProp>();

  const [fetchBookingDetails, { data: bookingData, isLoading }] =
    useLazyGetBookingDetailsQuery();
  const [requestRefund, { isLoading: isRefundLoading }] =
    useRequestRefundMutation();
  const [rescheduleResponse, { isLoading: isRescheduleLoading }] =
    useRescheduleResponseMutation();
  const [reportBooking, { isLoading: isReportLoading }] =
    useReportBookingMutation();
  const [reviewBooking, { isLoading: isReviewLoading }] =
    useReviewBookingMutation();

  const [showRefundPolicyModal, setShowRefundPolicyModal] = useState(false);
  const [showRefundReasonModal, setShowRefundReasonModal] = useState(false);
  const [showRefundSuccessModal, setShowRefundSuccessModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectReasonModal, setShowRejectReasonModal] = useState(false);
  const [showRejectSuccessModal, setShowRejectSuccessModal] = useState(false);
  const [refundReason, setRefundReason] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  // Report Service states
  const [showReportModal, setShowReportModal] = useState(false);
  const [showReportSuccessModal, setShowReportSuccessModal] = useState(false);
  const [reportText, setReportText] = useState('');
  const [reportFiles, setReportFiles] = useState<any[]>([]);

  // Review Service states
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReviewSuccessModal, setShowReviewSuccessModal] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  // Fetch booking details on mount
  useEffect(() => {
    if (params?.bookingId) {
      fetchBookingDetails(params.bookingId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.bookingId]);

  const booking = bookingData?.data;

  const onRefreshDetails = useCallback(() => {
    if (params?.bookingId) {
      fetchBookingDetails(params.bookingId);
    }
  }, [params?.bookingId, fetchBookingDetails]);

  // Refund flow
  const onPressRefund = useCallback(() => {
    setShowRefundPolicyModal(true);
  }, []);

  const onCancelRefundPolicy = useCallback(() => {
    setShowRefundPolicyModal(false);
  }, []);

  const onProceedToRefundReason = useCallback(() => {
    setShowRefundPolicyModal(false);
    setShowRefundReasonModal(true);
  }, []);

  const onCancelRefundReason = useCallback(() => {
    setShowRefundReasonModal(false);
    setRefundReason('');
  }, []);

  const onConfirmRefund = useCallback(async () => {
    if (!refundReason.trim()) {
      return;
    }

    try {
      setShowRefundReasonModal(false);
      await requestRefund({
        id: params.bookingId,
        cancellation_reason: refundReason,
      }).unwrap();
      setRefundReason('');
      setShowRefundSuccessModal(true);
    } catch (error) {
      console.error('Refund request failed:', error);
    }
  }, [params.bookingId, refundReason, requestRefund]);

  const onCloseRefundSuccess = useCallback(() => {
    setShowRefundSuccessModal(false);
    onRefreshDetails();
  }, [onRefreshDetails]);

  // Reschedule approve flow
  const onPressApprove = useCallback(() => {
    setShowApproveModal(true);
  }, []);

  const onCancelApprove = useCallback(() => {
    setShowApproveModal(false);
  }, []);

  const onConfirmApprove = useCallback(async () => {
    try {
      setShowApproveModal(false);
      await rescheduleResponse({
        id: params.bookingId,
        response: 'approved',
      }).unwrap();
      setShowRefundSuccessModal(true); // Reuse success modal
    } catch (error) {
      console.error('Approve reschedule failed:', error);
    }
  }, [params.bookingId, rescheduleResponse]);

  // Reschedule reject flow
  const onPressReject = useCallback(() => {
    setShowRejectReasonModal(true);
  }, []);

  const onCancelRejectReason = useCallback(() => {
    setShowRejectReasonModal(false);
    setRejectionReason('');
  }, []);

  const onConfirmReject = useCallback(async () => {
    if (!rejectionReason.trim()) {
      return;
    }

    try {
      setShowRejectReasonModal(false);
      await rescheduleResponse({
        id: params.bookingId,
        response: 'rejected',
        rejection_reason: rejectionReason,
      }).unwrap();
      setRejectionReason('');
      setShowRejectSuccessModal(true);
    } catch (error) {
      console.error('Reject reschedule failed:', error);
    }
  }, [params.bookingId, rejectionReason, rescheduleResponse]);

  const onCloseRejectSuccess = useCallback(() => {
    setShowRejectSuccessModal(false);
    onRefreshDetails();
  }, [onRefreshDetails]);

  const onViewLocation = useCallback(() => {
    if (booking?.address) {
      navigation.navigate('LocationView', {
        lat: booking.address.lat,
        lng: booking.address.lng,
        address: booking.address.full_address,
        floor: booking.address.floor,
        viewOnly: true,
      });
    }
  }, [booking, navigation]);

  // Report Service handlers
  const onPressReportService = useCallback(() => {
    setShowReportModal(true);
  }, []);

  const onCancelReport = useCallback(() => {
    setShowReportModal(false);
    setReportText('');
    setReportFiles([]);
  }, []);

  const onConfirmReport = useCallback(async () => {
    if (!reportText.trim()) {
      console.log('Please enter report details');
      return;
    }

    try {
      setShowReportModal(false);

      const payload = {
        service: booking?.service?._id,
        reason: reportText,
        booking: params.bookingId,
        attachments: reportFiles,
      };

      const formData = formHandler(payload);

      await reportBooking(formData).unwrap();

      setShowReportSuccessModal(true);
    } catch (error) {
      console.error('Report submission failed:', error);
    }
  }, [params.bookingId, reportText, reportFiles, reportBooking, booking]);

  const onCloseReportSuccess = useCallback(() => {
    setShowReportSuccessModal(false);
    setReportText('');
    setReportFiles([]);
    onRefreshDetails();
  }, [onRefreshDetails]);

  const onUploadReportFiles = useCallback(() => {
    openMultipleImagePicker((files) => {
      if (files && files.length > 0) {
        setReportFiles(files);
      }
    });
  }, []);

  // Review Service handlers
  const onPressReviewService = useCallback(() => {
    setShowReviewModal(true);
  }, []);

  const onCancelReview = useCallback(() => {
    setShowReviewModal(false);
    setReviewText('');
    setRating(0);
  }, []);

  const onConfirmReview = useCallback(async () => {
    if (!reviewText.trim() || rating === 0) {
      console.log('Please provide rating and review');
      return;
    }

    try {
      setShowReviewModal(false);
      await reviewBooking({
        rating: rating,
        review: reviewText,
        booking: params.bookingId,
      }).unwrap();

      setShowReviewSuccessModal(true);
    } catch (error) {
      console.error('Review submission failed:', error);
    }
  }, [params.bookingId, reviewText, rating, reviewBooking]);

  const onCloseReviewSuccess = useCallback(() => {
    setShowReviewSuccessModal(false);
    setReviewText('');
    setRating(0);
    onRefreshDetails();
  }, [onRefreshDetails]);

  return {
    values: {
      booking,
      isLoading,
      isRefundLoading,
      isRescheduleLoading,
      isReportLoading,
      isReviewLoading,
      showRefundPolicyModal,
      showRefundReasonModal,
      showRefundSuccessModal,
      showApproveModal,
      showRejectReasonModal,
      showRejectSuccessModal,
      refundReason,
      rejectionReason,
      // Report states
      showReportModal,
      showReportSuccessModal,
      reportText,
      reportFiles,
      // Review states
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
      // Report functions
      onPressReportService,
      onCancelReport,
      onConfirmReport,
      onCloseReportSuccess,
      onUploadReportFiles,
      setReportText,
      setReportFiles,
      // Review functions
      onPressReviewService,
      onCancelReview,
      onConfirmReview,
      onCloseReviewSuccess,
      setReviewText,
      setRating,
    },
  };
};

export default useAppointmentDetailsController;
