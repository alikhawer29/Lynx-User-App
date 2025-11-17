import { ScrollView, View } from "react-native"
import Badge from "../../components/Badge"
import Button from "../../components/Button"
import Image from "../../components/Image"
import Input from "../../components/Input"
import Loader from "../../components/Loader"
import Row from "../../components/Row"
import Text from "../../components/Text"
import Touchable from "../../components/Touchable"
import Wrapper from "../../components/Wrapper"
import colors from "../../utils/colors"
import styles from "./styles"
import useBookServiceController from "./useBookServiceController"
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

const BookService = () => {

    const {
        values: {
            service,
            selectedTier,
            isLoading,
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
            errors,
            touched,
            selectedTimeSlot,
            selectedDate,
            weekDates,
            slots,
            currentMonth,
            slotsLoading,
            showContactDetails,
            showServiceDetails,
        },
        functions: {
            onViewLocation,
            onEditLocation,
            onContinue,
            handleChange,
            handleTouch,
            onSelectTimeSlot,
            onSelectDate,
            setPhoneCountry,
            setPhoneDialingCode,
            setShowContactDetails,
            setShowServiceDetails,
        }
    } = useBookServiceController()

    if (isLoading || !service) {
        return (
            <Wrapper>
                <Loader text="Loading" size={35} vertical={30} />
            </Wrapper>
        )
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
                        <Text size={25} weight="bold" color='#22282C' line_height={24}>{service.name}</Text>
                        <Badge text={`Category Type: ${service.category.name}`} size={13} />
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.price_text}>${price}</Text>
                        <Text size={10} style={styles.price_type}>{priceType} Price</Text>
                    </View>
                </Row>



                {/* Address Details Section */}
                <View style={styles.section}>
                    <Row align="center" justify="space-between">
                        <Text size={20} weight="bold" line_height={22}>Address Details</Text>
                        {address && (
                            <Text
                                size={14}
                                weight="bold"
                                color={colors.primary}
                                underline
                                onPress={onEditLocation}
                            >
                                Edit
                            </Text>
                        )}
                    </Row>

                    {address ? (
                        <View style={styles.address_preview}>
                            <MapView
                                provider={PROVIDER_GOOGLE}
                                style={styles.map_preview}
                                region={{
                                    latitude: lat || 24.8607,
                                    longitude: lng || 67.0011,
                                    latitudeDelta: 0.05,
                                    longitudeDelta: 0.05,
                                }}
                                scrollEnabled={false}
                                zoomEnabled={false}
                                pitchEnabled={false}
                                rotateEnabled={false}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: lat || 24.8607,
                                        longitude: lng || 67.0011,
                                    }}
                                />
                            </MapView>
                            <Row align="center" justify="space-between" style={styles.address_info}>
                                <View style={styles.address_text_container}>
                                    <Text size={14} weight="semibold" color='#22282C'>{address}</Text>
                                    {floor && <Text size={12} color='#22282C'>{floor}</Text>}
                                </View>
                                <Button text="View" type="outlined" height={40} onPress={onViewLocation} />
                            </Row>
                        </View>
                    ) : (

                        <View style={styles.address_preview}>
                            <MapView
                                provider={PROVIDER_GOOGLE}
                                style={styles.map_preview}
                                region={{
                                    latitude: lat || 24.8607,
                                    longitude: lng || 67.0011,
                                    latitudeDelta: 0.05,
                                    longitudeDelta: 0.05,
                                }}
                                scrollEnabled={false}
                                zoomEnabled={false}
                                pitchEnabled={false}
                                rotateEnabled={false}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: lat || 24.8607,
                                        longitude: lng || 67.0011,
                                    }}
                                />
                            </MapView>
                            <Button
                                text="View"
                                style={styles.view_button}
                                onPress={onViewLocation}
                            />
                        </View>

                    )}

                    {address && (
                        <Input
                            label="Floor"
                            placeholder="Enter Your Floor (optional)"
                            type="text"
                            value={floor}
                            onChangeText={handleChange('floor')}
                        />
                    )}
                </View>

                {/* Contact Details */}
                <View style={styles.section}>
                    <Touchable
                        onPress={() => setShowContactDetails(!showContactDetails)}
                        style={styles.collapse_header}
                    >
                        <Text size={20} weight="bold">Contact Details</Text>
                        {/* <Text size={16}>{showContactDetails ? "▲" : "▼"}</Text> */}
                    </Touchable>

                    {showContactDetails && (
                        <>
                            <Input
                                label="First Name"
                                placeholder="Enter First Name"
                                value={firstName}
                                onChangeText={(text) => {
                                    handleChange('firstName')(text)
                                    handleTouch('firstName')
                                }}
                                error={touched.firstName ? errors.firstName : ''}
                                required
                            />

                            <Input
                                label="Last Name"
                                placeholder="Enter Last Name"
                                value={lastName}
                                onChangeText={(text) => {
                                    handleChange('lastName')(text)
                                    handleTouch('lastName')
                                }}
                                error={touched.lastName ? errors.lastName : ''}
                                required
                            />

                            <Input
                                label="Phone Number"
                                placeholder="Enter Phone Number"
                                type="phone"
                                value={phone}
                                country={phoneCountry}
                                onChangeText={(text) => {
                                    handleChange('phone')(text)
                                    handleTouch('phone')
                                }}
                                onChangeCountry={(country) => {
                                    setPhoneCountry(country.cca2)
                                    setPhoneDialingCode(`+${country.callingCode[0]}`)
                                }}
                                error={touched.phone ? errors.phone : ''}
                                required
                            />

                            <Input
                                label="Email Address"
                                placeholder="Enter Email Address"
                                value={email}
                                onChangeText={(text) => {
                                    handleChange('email')(text)
                                    handleTouch('email')
                                }}
                                error={touched.email ? errors.email : ''}
                                required
                            />
                        </>
                    )}
                </View>


                {/* Service Details */}
                <View style={styles.section}>
                    <Touchable
                        onPress={() => setShowServiceDetails(!showServiceDetails)}
                        style={styles.collapse_header}
                    >
                        <Text size={20} weight="bold">Service Details</Text>
                    </Touchable>

                    {showServiceDetails && (
                        <>
                            <Row align="center" justify="space-between" style={styles.schedules_header}>
                                {/* <Text size={18} weight="bold">Schedules</Text> */}
                                <Text size={14} weight="semibold" color={colors.dark_gray}>Schedules</Text>
                                <Text size={14} weight="semibold" color={colors.dark_gray}>{currentMonth}</Text>
                            </Row>

                            <Row gap={8} style={styles.dates_container}>
                                {weekDates.map((dateItem) => {
                                    const isSelected = selectedDate === dateItem.date;

                                    return (
                                        <Touchable
                                            key={dateItem.date}
                                            style={[
                                                styles.date_item,
                                                isSelected && styles.date_item_selected
                                            ]}
                                            onPress={() => onSelectDate(dateItem.date, dateItem.dayName)}
                                        >
                                            <Text
                                                size={16}
                                                weight="bold"
                                                color={isSelected ? colors.white : colors.black}
                                            >
                                                {dateItem.day}
                                            </Text>
                                            <Text
                                                size={10}
                                                weight="semibold"
                                                color={isSelected ? colors.white : colors.dark_gray}
                                            >
                                                {dateItem.dayName}
                                            </Text>
                                        </Touchable>
                                    );
                                })}
                            </Row>

                            <Text size={18} weight="bold" style={styles.available_hours_title}>
                                Available Hours
                            </Text>

                            {slotsLoading ? (
                                <Loader text="Loading slots..." />
                            ) : slots.length > 0 ? (
                                <View style={styles.time_slots_container}>
                                    {slots.map((slot) => {
                                        const isBooked = slot.is_booked;
                                        const isSelected = selectedTimeSlot === slot.time_range;

                                        return (
                                            <Touchable
                                                key={slot.id}
                                                style={[
                                                    styles.time_slot,
                                                    isSelected && !isBooked && styles.time_slot_selected,
                                                    isBooked && styles.time_slot_booked
                                                ]}
                                                onPress={() => onSelectTimeSlot(slot.time_range, slot.id, isBooked)}
                                                disabled={isBooked}
                                            >
                                                <Text
                                                    size={14}
                                                    weight="semibold"
                                                    color={
                                                        isBooked || isSelected
                                                            ? colors.white
                                                            : '#333333'
                                                    }
                                                >
                                                    {slot.time_range_new}
                                                </Text>
                                            </Touchable>
                                        );
                                    })}
                                </View>
                            ) : (
                                <Text size={14} color={colors.dark_gray}>No slots available</Text>
                            )}
                        </>
                    )}
                </View>


                <Button
                    text="Continue"
                    // type="secondary"
                    style={styles.continue_button}
                    onPress={onContinue}
                />
            </ScrollView>
        </Wrapper>
    )
}

export default BookService

