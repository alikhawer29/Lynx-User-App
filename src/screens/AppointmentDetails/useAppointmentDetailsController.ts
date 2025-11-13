import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useState, useEffect } from 'react';
import { MyAppointmentsStackParamList } from '../../interfaces';
import {
  useLazyGetBookingDetailsQuery,
  useRequestRefundMutation,
  useApproveRescheduleMutation,
  useRejectRescheduleMutation,
} from '../../redux/Apis/Booking';

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
  const [approveReschedule, { isLoading: isApproveLoading }] =
    useApproveRescheduleMutation();
  const [rejectReschedule, { isLoading: isRejectLoading }] =
    useRejectRescheduleMutation();

  const [showRefundPolicyModal, setShowRefundPolicyModal] = useState(false);
  const [showRefundReasonModal, setShowRefundReasonModal] = useState(false);
  const [showRefundSuccessModal, setShowRefundSuccessModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectReasonModal, setShowRejectReasonModal] = useState(false);
  const [showRejectSuccessModal, setShowRejectSuccessModal] = useState(false);
  const [refundReason, setRefundReason] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

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
      console.log('Please enter refund reason');
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
      await approveReschedule(params.bookingId).unwrap();
      setShowRefundSuccessModal(true); // Reuse success modal
    } catch (error) {
      console.error('Approve reschedule failed:', error);
    }
  }, [params.bookingId, approveReschedule]);

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
      console.log('Please enter rejection reason');
      return;
    }

    try {
      setShowRejectReasonModal(false);
      await rejectReschedule({
        id: params.bookingId,
        reason: rejectionReason,
      }).unwrap();
      setRejectionReason('');
      setShowRejectSuccessModal(true);
    } catch (error) {
      console.error('Reject reschedule failed:', error);
    }
  }, [params.bookingId, rejectionReason, rejectReschedule]);

  const onCloseRejectSuccess = useCallback(() => {
    setShowRejectSuccessModal(false);
    onRefreshDetails();
  }, [onRefreshDetails]);

  const onViewLocation = useCallback(() => {
    // Navigate to map view if needed
    console.log('View location');
  }, []);

  return {
    values: {
      booking,
      isLoading,
      isRefundLoading,
      isApproveLoading,
      isRejectLoading,
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
  };
};

export default useAppointmentDetailsController;
