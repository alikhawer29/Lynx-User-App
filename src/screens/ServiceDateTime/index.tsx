import { ScrollView, View, Modal } from "react-native"
import Badge from "../../components/Badge"
import Button from "../../components/Button"
import Image from "../../components/Image"
import Row from "../../components/Row"
import Text from "../../components/Text"
import Touchable from "../../components/Touchable"
import Wrapper from "../../components/Wrapper"
import colors from "../../utils/colors"
import styles from "./styles"
import useServiceDateTimeController from "./useServiceDateTimeController"
import images from "../../assets/images"
import Icon from "../../components/Icon"
import CountryPicker from 'react-native-country-picker-modal'
import { BlurView } from "@react-native-community/blur"
import { useState } from "react"

const ServiceDateTime = () => {
    const [showConfirm, setShowConfirm] = useState(false)

    const {
        values: {
            service,
            selectedTier,
            address,
            floor,
            lat,
            lng,
            firstName,
            lastName,
            phone,
            phoneCountry,
            phoneDialingCode,
            email,
            sessionTime,
            sessionDate,
            selectedTimeSlot,
            availableHours,
            isBookingLoading,
            isProcessing,
            showSuccessModal,
            bookingNumber
        },
        functions: {
            onSelectSessionTime,
            onSelectSessionDate,
            onContinue,
            onEditAddress,
            onEditContact,
            onViewAddress,
            onEditService,
            onSuccessOk
        }
    } = useServiceDateTimeController()

    if (!service) {
        return null
    }

    const price = selectedTier === 0 ? service.category.price.normal : service.category.price.premium
    const priceType = selectedTier === 0 ? 'Normal' : 'Premium'

    return (
        <Wrapper>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scroll_content}
            >
                <Image
                    source={{ uri: service.image_url }}
                    style={styles.service_image}
                    resize="cover"
                />

                <Row align="center" justify="space-between" style={styles.header_row}>
                    <View>
                        <Text size={25} weight="bold" color="#22282C" line_height={24}>
                            {service.name}
                        </Text>

                        <View style={{ marginTop: 8 }}>
                            <Badge text={`Category Type: ${service.category.name}`} size={13} />
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.price_text}>${price}</Text>
                        <Text size={10} style={styles.price_type}>{priceType} Price</Text>
                    </View>
                </Row>


                {/* Address Details Section */}
                <View style={styles.section}>
                    <Row align="center" justify="space-between" style={{ marginBottom: 15 }}>
                        <Text size={20} weight="bold" line_height={22}>Address Details</Text>
                        {address && (
                            <Row gap={5}>
                                <Text size={16} weight="bold" color='#22282C' underline onPress={onViewAddress}>
                                    View
                                </Text>
                                <Text size={16} color='#22282C'>/</Text>
                                <Text size={16} weight="bold" color='#22282C' underline onPress={onEditAddress}>
                                    Edit
                                </Text>
                            </Row>
                        )}
                    </Row>
                    {address ? (
                        <View>
                            <Text size={16} color='#333333'>
                                {address}
                            </Text>
                            <Text size={16} color='#333333' style={{ marginTop: 2 }}>
                                {floor && `Floor: ${floor}`}
                            </Text>
                        </View>
                    ) : (
                        <Text size={16} color='#22282C'>No address selected</Text>
                    )}
                </View>

                {/* Contact Details Section */}
                <Touchable style={styles.section} onPress={onEditContact}>
                    <Row align="center" justify="space-between">
                        <Text size={20} weight="bold" line_height={22}>Contact Details</Text>
                        <Text size={16} weight="bold" color='#22282C' underline>Edit</Text>
                    </Row>
                    <View style={styles.contact_grid}>
                        <Row>
                            <View style={styles.contact_item}>
                                <Text size={16} color='#22282C' weight="semibold">First Name*</Text>
                                <Text size={14} weight="semibold" color='#666666'>{firstName || '-'}</Text>
                            </View>
                            <View style={styles.contact_item}>
                                <Text size={16} color='#22282C' weight="semibold">Last Name*</Text>
                                <Text size={14} weight="semibold" color='#666666'>{lastName || '-'}</Text>
                            </View>
                        </Row>
                        <Row>
                            <View style={styles.contact_item}>
                                <Text size={16} color='#22282C' weight="semibold">Phone Number*</Text>
                                {phone ? (
                                    <Row align="center" gap={5}>
                                        <CountryPicker
                                            countryCode={phoneCountry as any || 'AE'}
                                            withFlag
                                            withEmoji={false}
                                            withFilter={false}
                                            withAlphaFilter={false}
                                            withCallingCode={false}
                                            withCountryNameButton={false}
                                            containerButtonStyle={{ padding: 0, margin: 0 }}
                                        />
                                        <Text size={14} weight="semibold" color='#666666'>{phone}</Text>
                                    </Row>
                                ) : (
                                    <Text size={14} weight="semibold">-</Text>
                                )}
                            </View>
                            <View style={styles.contact_item}>
                                <Text size={16} color='#22282C' weight="semibold">Email Address*</Text>
                                <Text size={14} weight="semibold" color='#666666'>{email || '-'}</Text>
                            </View>

                        </Row>



                    </View>
                </Touchable>

                {/* Service Details Section */}
                <View style={styles.section}>
                    <Row align="center" justify="space-between" style={{ marginBottom: 15 }}>
                        <Text size={20} weight="bold" color="#22282C">Service Details</Text>
                        <Text size={16} weight="bold" color='#22282C' underline onPress={onEditService}>
                            Edit
                        </Text>
                    </Row>

                    <Row align="flex-start" justify="space-between" gap={15}>
                        {/* Session Time */}
                        <View style={styles.service_detail_item}>
                            <Text size={16} weight="semibold" color="#22282C">Session Time</Text>
                            <Row align="center" gap={5} style={{ marginTop: 8 }}>
                                <Icon source={images.calendar} size={16} tint_color="#666666" />
                                <Text size={14} color='#666666'>
                                    {selectedTimeSlot || 'No time slot selected'}
                                </Text>
                            </Row>
                        </View>

                        {/* Session Date */}
                        <View style={styles.service_detail_item}>
                            <Text size={16} weight="semibold" color="#22282C">Session Date</Text>
                            <Row align="center" gap={5} style={{ marginTop: 8 }}>
                                <Icon source={images.calendar} size={16} tint_color="#666666" />
                                <Text size={14} color='#666666'>
                                    {sessionDate || 'Select Date'}
                                </Text>
                            </Row>
                        </View>
                    </Row>

                </View>


                <Button
                    text={isProcessing ? "Processing Payment..." : "Book Service"}
                    type="primary"
                    style={styles.continue_button}
                    onPress={() => setShowConfirm(true)}
                    loading={isBookingLoading || isProcessing}
                />
            </ScrollView>

            {/* Confirmation Modal */}
            <Modal
                visible={showConfirm}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowConfirm(false)}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 20
                }}>
                    <View style={{
                        backgroundColor: "#fff",
                        padding: 25,
                        borderRadius: 20,
                        alignItems: "center",
                        width: "100%",
                        maxWidth: 340,
                        position: "relative"
                    }}>
                        {/* Close Button */}
                        <Touchable
                            onPress={() => setShowConfirm(false)}
                            style={{
                                position: "absolute",
                                top: 15,
                                right: 15,
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                backgroundColor: "#F0F0F0",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text size={16} color={colors.dark_gray}>✕</Text>
                        </Touchable>

                        {/* Warning Icon */}
                        <View style={{
                            width: 70,
                            height: 70,
                            borderRadius: 35,
                            backgroundColor: "#FF4444",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 15
                        }}>
                            <Text size={32} weight="bold" color='white'>!</Text>
                        </View>

                        {/* Title */}
                        <Text size={23} weight="bold" style={{ marginBottom: 8 }}>
                            Booking
                        </Text>

                        {/* Subtitle */}
                        <Text size={14} color={colors.dark_gray} style={{ textAlign: "center", marginBottom: 25 }}>
                            Are You Sure You Want To Book Service?
                        </Text>

                        {/* Buttons */}
                        <Row justify="space-between" style={{ width: "100%", gap: 10 }}>
                            <Button
                                text="Yes"
                                type="primary"
                                style={{ flex: 1 }}
                                onPress={() => {
                                    setShowConfirm(false)
                                    onContinue()
                                }}
                            />

                            <Button
                                text="No"
                                type="secondary"
                                style={{ flex: 1, backgroundColor: colors.dark_gray }}
                                onPress={() => setShowConfirm(false)}
                            />
                        </Row>
                    </View>
                </View>
            </Modal>

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

export default ServiceDateTime

