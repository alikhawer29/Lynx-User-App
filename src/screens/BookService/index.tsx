import { ScrollView, View, Platform } from 'react-native';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Image from '../../components/Image';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import Row from '../../components/Row';
import Text from '../../components/Text';
import Touchable from '../../components/Touchable';
import Wrapper from '../../components/Wrapper';
import colors from '../../utils/colors';
import styles from './styles';
import useBookServiceController from './useBookServiceController';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useState } from 'react';
import CountryPicker from 'react-native-country-picker-modal';
import Icon from '../../components/Icon';
import images from '../../assets/images';

const BookService = () => {
  const {
    values: {
      service,
      selectedTier,
      visitType,
      isLocationRequired,
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
      showAddress,
      showFloor,
      showTimeSlot,
      showContact,
      editMode,
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
      setShowAddress,
      onEditAddress,
      setShowFloor,
      setShowTimeSlot,
      setShowContact,
      onEditContact,
      onEditService,
    },
  } = useBookServiceController();

  if (isLoading || !service) {
    return (
      <Wrapper>
        <Loader text="Loading" size={35} vertical={30} />
      </Wrapper>
    );
  }
  const price =
    selectedTier === 0
      ? service.category.price.normal
      : service.category.price.premium;
  const priceType = selectedTier === 0 ? 'Normal' : 'Premium';

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
              <Badge
                text={`Category Type: ${service.category.name}`}
                size={13}
              />
            </View>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.price_text}>${price}</Text>
            <Text size={10} style={styles.price_type}>
              {priceType} Price
            </Text>
          </View>
        </Row>

        {/* Address Details Section - Only show if location is required */}
        {isLocationRequired && ((!showAddress && !editMode) || editMode === 'address') ? (
          // ADDRESS FORM
          <View style={styles.section}>
            <Row align="center" justify="space-between">
              <Text size={20} weight="bold" line_height={22}>
                Address Details
              </Text>
            </Row>

            {address ? (
              <View style={styles.address_preview}>
                <MapView
                  onPress={onViewLocation}
                  provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
                  style={styles.map_preview}
                  region={{
                    latitude: lat || 25.2048,
                    longitude: lng || 55.2708,
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
                      latitude: lat || 25.2048,
                      longitude: lng || 55.2708,
                    }}
                  />
                </MapView>
                <Row
                  align="center"
                  justify="space-between"
                  style={styles.address_info}
                >
                  <View style={styles.address_text_container}>
                    <Text size={14} weight="semibold" color="#22282C">
                      {address}
                    </Text>
                    {floor && (
                      <Text size={12} color="#22282C">
                        {floor}
                      </Text>
                    )}
                  </View>
                </Row>
              </View>
            ) : (
              <View style={styles.address_preview}>
                <MapView
                  provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
                  style={styles.map_preview}
                  region={{
                    latitude: lat || 25.2048,
                    longitude: lng || 55.2708,
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
                      latitude: lat || 25.2048,
                      longitude: lng || 55.2708,
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
              <>
                <Input
                  label="Floor"
                  placeholder="Enter Your Floor (optional)"
                  type="text"
                  value={floor}
                  onChangeText={handleChange('floor')}
                />
                <Button
                  text="Continue"
                  style={styles.continue_button}
                  onPress={editMode ? onContinue : () => setShowAddress(true)}
                />
              </>
            )}
          </View>
        ) : isLocationRequired && (showAddress || (editMode && editMode !== 'address')) ? (
          // ADDRESS SUMMARY
          <View style={styles.section}>
            <Row
              align="center"
              justify="space-between"
              style={{ marginBottom: 15 }}
            >
              <Text size={20} weight="bold" line_height={22}>
                Address Details
              </Text>
              {address && (
                <Row gap={5}>
                  <Text
                    size={16}
                    weight="bold"
                    color="#22282C"
                    underline
                    onPress={onViewLocation}
                  >
                    View
                  </Text>
                  <Text size={16} color="#22282C">
                    /
                  </Text>
                  <Text
                    size={16}
                    weight="bold"
                    color="#22282C"
                    underline
                    onPress={onEditAddress}
                  >
                    Edit
                  </Text>
                </Row>
              )}
            </Row>
            {address ? (
              <View>
                <Text size={16} color="#333333">
                  {address}
                </Text>
                <Text size={16} color="#333333" style={{ marginTop: 2 }}>
                  {floor && `Floor: ${floor}`}
                </Text>
              </View>
            ) : (
              <Text size={16} color="#22282C">
                No address selected
              </Text>
            )}
          </View>
        ) : null}

        {/* Contact Details Section */}
        {(!showContact && !editMode) || editMode === 'contact' ? (
          // CONTACT FORM
          <View style={styles.section}>
            <Touchable
              onPress={() => setShowContactDetails(!showContactDetails)}
              style={styles.collapse_header}
            >
              <Text size={20} weight="bold">
                Contact Details
              </Text>
            </Touchable>

            {showContactDetails && (
              <>
                <Input
                  label="First Name"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChangeText={text => {
                    handleChange('firstName')(text);
                    handleTouch('firstName');
                  }}
                  error={touched.firstName ? errors.firstName : ''}
                  required
                />

                <Input
                  label="Last Name"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChangeText={text => {
                    handleChange('lastName')(text);
                    handleTouch('lastName');
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
                  onChangeText={text => {
                    handleChange('phone')(text);
                    handleTouch('phone');
                  }}
                  onChangeCountry={country => {
                    setPhoneCountry(country.cca2);
                    setPhoneDialingCode(`+${country.callingCode[0]}`);
                  }}
                  error={touched.phone ? errors.phone : ''}
                  required
                />

                <Input
                  label="Email Address"
                  placeholder="Enter Email Address"
                  value={email}
                  onChangeText={text => {
                    handleChange('email')(text);
                    handleTouch('email');
                  }}
                  error={touched.email ? errors.email : ''}
                  required
                />
              </>
            )}
            {showContactDetails && (
              <Button
                text={editMode ? 'Continue' : 'Continue'}
                style={styles.continue_button}
                onPress={editMode ? onContinue : () => setShowContact(true)}
              />
            )}
          </View>
        ) : showContact || (editMode && editMode !== 'contact') ? (
          // CONTACT SUMMARY
          <Touchable style={styles.section} onPress={onEditContact}>
            <Row align="center" justify="space-between">
              <Text size={20} weight="bold" line_height={22}>
                Contact Details
              </Text>
              <Text size={16} weight="bold" color="#22282C" underline>
                Edit
              </Text>
            </Row>
            <View style={styles.contact_grid}>
              <Row>
                <View style={styles.contact_item}>
                  <Text size={16} color="#22282C" weight="semibold">
                    First Name*
                  </Text>
                  <Text size={14} weight="semibold" color="#666666">
                    {firstName || '-'}
                  </Text>
                </View>
                <View style={styles.contact_item}>
                  <Text size={16} color="#22282C" weight="semibold">
                    Last Name*
                  </Text>
                  <Text size={14} weight="semibold" color="#666666">
                    {lastName || '-'}
                  </Text>
                </View>
              </Row>
              <Row>
                <View style={styles.contact_item}>
                  <Text size={16} color="#22282C" weight="semibold">
                    Phone Number*
                  </Text>
                  {phone ? (
                    <Row align="center" gap={5}>
                      <CountryPicker
                        countryCode={(phoneCountry as any) || 'AE'}
                        withFlag
                        withEmoji={false}
                        withFilter={false}
                        withAlphaFilter={false}
                        withCallingCode={false}
                        withCountryNameButton={false}
                        containerButtonStyle={{ padding: 0, margin: 0 }}
                      />
                      <Text size={14} weight="semibold" color="#666666">
                        {phone}
                      </Text>
                    </Row>
                  ) : (
                    <Text size={14} weight="semibold">
                      -
                    </Text>
                  )}
                </View>
                <View style={styles.contact_item}>
                  <Text size={16} color="#22282C" weight="semibold">
                    Email Address*
                  </Text>
                  <Text size={14} weight="semibold" color="#666666">
                    {email || '-'}
                  </Text>
                </View>
              </Row>
            </View>
          </Touchable>
        ) : null}

        {/* Service Details Section */}
        {!editMode || editMode === 'service' ? (
          // SERVICE FORM
          <View style={styles.section}>
            <Touchable
              onPress={() => setShowServiceDetails(!showServiceDetails)}
              style={styles.collapse_header}
            >
              <Text size={20} weight="bold">
                Service Details
              </Text>
            </Touchable>

            {showServiceDetails && (editMode === 'service' || !editMode) && (
              <>
                <Row
                  align="center"
                  justify="space-between"
                  style={styles.schedules_header}
                >
                  {/* <Text size={18} weight="bold">Schedules</Text> */}
                  <Text size={14} weight="semibold" color={colors.dark_gray}>
                    Schedules
                  </Text>
                  <Text size={14} weight="semibold" color={colors.dark_gray}>
                    {currentMonth}
                  </Text>
                </Row>

                <Row gap={8} style={styles.dates_container}>
                  {weekDates.map(dateItem => {
                    const isSelected = selectedDate === dateItem.date;

                    return (
                      <Touchable
                        key={dateItem.date}
                        style={[
                          styles.date_item,
                          isSelected && styles.date_item_selected,
                        ]}
                        onPress={() =>
                          onSelectDate(dateItem.date, dateItem.dayName)
                        }
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

                <Text
                  size={18}
                  weight="bold"
                  style={styles.available_hours_title}
                >
                  Available Hours
                </Text>

                {slotsLoading ? (
                  <Loader text="Loading slots..." />
                ) : slots.length > 0 ? (
                  <View style={styles.time_slots_container}>
                    {slots.map(slot => {
                      const isBooked = slot.is_booked;
                      const isSelected = selectedTimeSlot === slot.time_range;

                      return (
                        <Touchable
                          key={slot.id}
                          style={[
                            styles.time_slot,
                            isSelected &&
                            !isBooked &&
                            styles.time_slot_selected,
                            isBooked && styles.time_slot_booked,
                          ]}
                          onPress={() =>
                            onSelectTimeSlot(slot.time_range, slot.id, isBooked)
                          }
                          disabled={isBooked}
                        >
                          <Text
                            size={14}
                            weight="semibold"
                            color={
                              isBooked || isSelected ? colors.white : '#333333'
                            }
                          >
                            {slot.time_range_new}
                          </Text>
                        </Touchable>
                      );
                    })}
                  </View>
                ) : (
                  <Text size={14} color={colors.dark_gray}>
                    No slots available
                  </Text>
                )}

                {selectedTimeSlot && (
                  <Button
                    text={editMode ? 'Save' : 'Continue'}
                    style={styles.continue_button}
                    onPress={onContinue}
                  />
                )}
              </>
            )}
          </View>
        ) : editMode &&
          editMode !== 'service' &&
          selectedDate &&
          selectedTimeSlot ? (
          // SERVICE SUMMARY
          <View style={styles.section}>
            <Row align="center" justify="space-between">
              <Text size={20} weight="bold">
                Service Details
              </Text>
              <Text size={16} weight="bold" color="#22282C" underline>
                Edit
              </Text>
            </Row>
            <View style={styles.summary_section}>
              <Row align="flex-start" justify="space-between" gap={15}>
                {/* Session Time */}
                <View style={styles.service_detail_item}>
                  <Text size={16} weight="semibold" color="#22282C">
                    Session Time
                  </Text>
                  <Row align="center" gap={5} style={{ marginTop: 8 }}>
                    <Icon
                      source={images.calendar}
                      size={16}
                      tint_color="#666666"
                    />
                    <Text size={14} color="#666666">
                      {selectedTimeSlot || 'No time slot selected'}
                    </Text>
                  </Row>
                </View>

                {/* Session Date */}
                <View style={styles.service_detail_item}>
                  <Text size={16} weight="semibold" color="#22282C">
                    Session Date
                  </Text>
                  <Row align="center" gap={5} style={{ marginTop: 8 }}>
                    <Icon
                      source={images.calendar}
                      size={16}
                      tint_color="#666666"
                    />
                    <Text size={14} color="#666666">
                      {selectedDate || 'Select Date'}
                    </Text>
                  </Row>
                </View>
              </Row>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </Wrapper>
  );
};

export default BookService;
