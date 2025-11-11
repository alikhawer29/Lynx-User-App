import { Modal, ScrollView, View, ActivityIndicator } from "react-native"
import Button from "../../components/Button"
import Image from "../../components/Image"
import Text from "../../components/Text"
import Wrapper from "../../components/Wrapper"
import colors from "../../utils/colors"
import styles from "./styles"
import usePaymentDetailsController from "./usePaymentDetailsController"
import images from "../../assets/images"
import Icon from "../../components/Icon"
import Touchable from "../../components/Touchable"
import { BlurView } from "@react-native-community/blur"
import { CardField } from '@stripe/stripe-react-native'

const PaymentDetails = () => {

    const {
        values: {
            service,
            selectedTier,
            amount,
            clientSecret,
            bookingNumber,
            showSuccessModal,
            isProcessing,
            isCreatingIntent
        },
        functions: {
            onPayNow,
            onSuccessOk
        }
    } = usePaymentDetailsController()

    if (!service) {
        return null
    }

    const price = selectedTier === 0 ? service.category.price.normal : service.category.price.premium

    return (
        <Wrapper>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scroll_content}
            >
                <Text size={18} weight="bold" style={styles.amount_label}>Amount: ${amount || price}.00</Text>

                {isCreatingIntent ? (
                    <View style={styles.loading_container}>
                        <ActivityIndicator size="large" color={colors.primary} />
                        <Text size={14} color={colors.dark_gray} style={{ marginTop: 10 }}>
                            Preparing payment...
                        </Text>
                    </View>
                ) : (
                    <>
                        <View style={styles.form_section}>
                            <CardField
                                postalCodeEnabled={false}
                                placeholders={{
                                    number: '4242 4242 4242 4242',
                                }}
                                cardStyle={{
                                    backgroundColor: '#FFFFFF',
                                    textColor: '#000000',
                                }}
                                style={styles.card_field}
                            />
                        </View>

                        <Button
                            text={isProcessing ? "Processing..." : "Pay Now"}
                            type="secondary"
                            style={styles.pay_button}
                            onPress={!clientSecret || isProcessing ? undefined : onPayNow}
                        />
                    </>
                )}
            </ScrollView>

            {/* Success Modal */}
            {showSuccessModal && (
                <Modal
                    transparent
                    visible={showSuccessModal}
                    animationType="fade"
                    statusBarTranslucent
                >
                    <Touchable style={styles.modal_overlay} onPress={onSuccessOk}>
                        <BlurView
                            style={styles.blur}
                            blurType="dark"
                            blurRadius={2}
                        />
                        <Touchable style={styles.modal_content} onPress={() => { }}>
                            <View style={styles.close_icon}>
                                <Icon
                                    rounded
                                    source={images.cross}
                                    size={30}
                                    onPress={onSuccessOk}
                                    color={colors.primary}
                                    border={colors.medium_primary}
                                />
                            </View>
                            <Image
                                source={images.modal_check}
                                style={styles.modal_icon}
                            />
                            <Text size={24} weight="bold" position="center" style={styles.modal_title}>
                                Successfully
                            </Text>
                            <Text size={14} color={colors.dark_gray} position="center" style={styles.modal_message}>
                                Booking {bookingNumber ? `#${bookingNumber}` : ''} Has Been Done Successfully
                            </Text>
                            <Button
                                text="Ok"
                                height={40}
                                onPress={onSuccessOk}
                            />
                        </Touchable>
                    </Touchable>
                </Modal>
            )}
        </Wrapper>
    )
}

export default PaymentDetails

