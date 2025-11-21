import { RouteProp, useRoute } from '@react-navigation/native';
import { useCallback, useState, useEffect } from 'react';
import { ServiceStackParamList } from '../../interfaces';
import { NAVIGATORS } from '../../utils/routes';
import { useStripe } from '@stripe/stripe-react-native';
import {
  useCreatePaymentIntentMutation,
  useUpdatePaymentStatusMutation,
} from '../../redux/Apis/Booking';
import { navigationRef } from '../../utils/navigation';
import { CommonActions } from '@react-navigation/native';
import { Alert } from 'react-native';

type PaymentDetailsRouteProp = RouteProp<
  ServiceStackParamList,
  'PaymentDetails'
>;

const usePaymentDetailsController = () => {
  const { params } = useRoute<PaymentDetailsRouteProp>();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [createPaymentIntent, { isLoading: isCreatingIntent }] =
    useCreatePaymentIntentMutation();
  const [updatePaymentStatus] = useUpdatePaymentStatusMutation();

  const [clientSecret, setClientSecret] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [paymentId, setPaymentId] = useState<string>('');
  const [bookingNumber, setBookingNumber] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentSheetReady, setPaymentSheetReady] = useState<boolean>(false);

  // Create payment intent and initialize payment sheet when component mounts
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

            // Initialize the payment sheet
            const { error } = await initPaymentSheet({
              merchantDisplayName: 'Lynx Consultancy',
              paymentIntentClientSecret: result.data.clientSecret,
              defaultBillingDetails: {
                name: params?.service?.category?.name || 'Customer',
              },
              returnURL: 'lynx://payment-complete',
            });

            if (error) {
              console.error('Error initializing payment sheet:', error);
              Alert.alert(
                'Error',
                'Failed to initialize payment. Please try again.',
              );
            } else {
              console.log('Payment sheet initialized successfully');
              setPaymentSheetReady(true);
            }
          }
        }

        // Set booking number from params
        if (params?.bookingNumber) {
          setBookingNumber(params.bookingNumber);
        }
      } catch (error) {
        console.error('Failed to create payment intent:', error);
        Alert.alert('Error', 'Failed to prepare payment. Please try again.');
      }
    };

    initPayment();
  }, [
    params?.bookingId,
    params?.bookingNumber,
    params?.service,
    createPaymentIntent,
    initPaymentSheet,
  ]);

  const onPayNow = useCallback(async () => {
    if (!paymentSheetReady) {
      Alert.alert('Please wait', 'Payment is being prepared...');
      return;
    }

    setIsProcessing(true);

    try {
      // Present the payment sheet
      const { error } = await presentPaymentSheet();

      if (error) {
        console.error('Payment failed:', error);
        setIsProcessing(false);

        // Show error message based on error code
        if (error.code === 'Canceled') {
          // User canceled the payment
          console.log('Payment canceled by user');
        } else {
          Alert.alert(
            'Payment Failed',
            error.message || 'Something went wrong. Please try again.',
          );
        }
      } else {
        // Payment successful
        console.log('Payment successful!');

        // Update payment status in backend
        try {
          await updatePaymentStatus({
            id: paymentId,
            payment_status: 'succeeded',
            payment_method: 'card',
          }).unwrap();
        } catch (updateError) {
          console.error('Failed to update payment status:', updateError);
        }

        setIsProcessing(false);
        setShowSuccessModal(true);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setIsProcessing(false);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  }, [paymentSheetReady, presentPaymentSheet, paymentId, updatePaymentStatus]);

  const onSuccessOk = useCallback(() => {
    setShowSuccessModal(false);

    // Reset navigation to My Appointments to prevent going back to payment screen
    if (navigationRef.isReady()) {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: NAVIGATORS.MY_APPOINTMENTS_STACK,
            },
          ],
        }),
      );
    }
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
      paymentSheetReady,
    },
    functions: {
      onPayNow,
      onSuccessOk,
    },
  };
};

export default usePaymentDetailsController;
