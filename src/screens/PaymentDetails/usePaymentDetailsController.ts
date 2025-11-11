import { RouteProp, useRoute } from '@react-navigation/native';
import { useCallback, useState, useEffect } from 'react';
import { ServiceStackParamList } from '../../interfaces';
import { NAVIGATORS } from '../../utils/routes';
import { useStripe } from '@stripe/stripe-react-native';
import {
  useCreatePaymentIntentMutation,
  useUpdatePaymentStatusMutation,
} from '../../redux/Apis/Booking';
import { navigate } from '../../utils/navigation';

type PaymentDetailsRouteProp = RouteProp<
  ServiceStackParamList,
  'PaymentDetails'
>;

const usePaymentDetailsController = () => {
  const { params } = useRoute<PaymentDetailsRouteProp>();
  const { confirmPayment } = useStripe();
  const [createPaymentIntent, { isLoading: isCreatingIntent }] =
    useCreatePaymentIntentMutation();
  const [updatePaymentStatus] = useUpdatePaymentStatusMutation();

  const [clientSecret, setClientSecret] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [paymentId, setPaymentId] = useState<string>('');
  const [bookingNumber, setBookingNumber] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Create payment intent when component mounts
  useEffect(() => {
    const initPayment = async () => {
      try {
        if (params?.bookingId) {
          const result = await createPaymentIntent({
            booking_id: params.bookingId,
          }).unwrap();

          console.log('Payment intent created:', result);

          if (result?.data?.clientSecret) {
            setClientSecret(result.data.clientSecret);
            setAmount(result.data.amount);
            setPaymentId(result.data.paymentId);
          }
        }

        // Set booking number from params
        if (params?.bookingNumber) {
          setBookingNumber(params.bookingNumber);
        }
      } catch (error) {
        console.error('Failed to create payment intent:', error);
      }
    };

    initPayment();
  }, [params?.bookingId, params?.bookingNumber, createPaymentIntent]);

  const onPayNow = useCallback(async () => {
    if (!clientSecret) {
      console.error('No client secret available');
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
      });

      if (error) {
        console.error('Payment failed:', error);
        setIsProcessing(false);
        // You can show an error toast here
      } else if (paymentIntent) {
        console.log('Payment successful:', paymentIntent);

        // Update payment status in backend
        try {
          await updatePaymentStatus({
            id: paymentId,
            payment_status: 'succeeded',
            transaction_id: paymentIntent.id,
            payment_method: 'card',
          }).unwrap();

          console.log('Payment status updated successfully');
        } catch (updateError) {
          console.error('Failed to update payment status:', updateError);
        }

        setIsProcessing(false);
        setShowSuccessModal(true);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setIsProcessing(false);
    }
  }, [clientSecret, confirmPayment, paymentId, updatePaymentStatus]);

  const onSuccessOk = useCallback(() => {
    setShowSuccessModal(false);
    // Navigate to My Appointments Stack Navigator
    navigate(NAVIGATORS.MY_APPOINTMENTS_STACK);
  }, []);

  return {
    values: {
      service: params?.service,
      selectedTier: params?.selectedTier ?? 0,
      amount,
      clientSecret,
      bookingNumber,
      showSuccessModal,
      isProcessing,
      isCreatingIntent,
    },
    functions: {
      onPayNow,
      onSuccessOk,
    },
  };
};

export default usePaymentDetailsController;
