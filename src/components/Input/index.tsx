import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { LayoutAnimation, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import PhoneInput from "react-native-phone-number-input";
import fonts from '../../assets/fonts';
import images from '../../assets/images';
import useToggle from '../../hooks/useToggle';
import { IInput } from '../../interfaces';
import colors from '../../utils/colors';
import { createInsets, dateFormatter, font, heightPixel, timeFormatter, widthPixel } from '../../utils/helper';
import Icon from '../Icon';
import Text from '../Text';
import Touchable from '../Touchable';
import styles from './styles';

interface CountryData {
    cca2?: string;
    callingCode?: string[];
}

type KeyboardType = 'email-address' | 'numeric' | 'default';
type AutoCapitalize = 'none' | 'sentences' | 'words' | 'characters';

const Input: FC<IInput> = props => {

    const {
        label,
        placeholder,
        type,
        icon,
        error,
        value,
        onChangeText,
        onChangeCountry,
        onSubmitEditing,
        maxLength,
        disabled,
        required = false,
        height,
        mode = "primary",
        country = "AE"
    } = props

    const [isPasswordVisible, setIsPasswordVisible] = useState(type === 'password');
    const [isFocused, setIsFocused] = useState(false);
    const phoneRef = useRef<PhoneInput>(null);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    useEffect(() => {
        if (error) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }
    }, [error]);

    const getKeyboardProps = () => {
        const baseProps: { keyboardType: KeyboardType; autoCapitalize: AutoCapitalize } = {
            keyboardType: 'default',
            autoCapitalize: 'sentences'
        };

        switch (type) {
            case "email":
                return {
                    keyboardType: "email-address" as KeyboardType,
                    autoCapitalize: "none" as AutoCapitalize,
                };
            case "number":
                return {
                    keyboardType: "numeric" as KeyboardType,
                    autoCapitalize: "none" as AutoCapitalize
                };
            default:
                return baseProps;
        }
    };

    const keyboardProps = getKeyboardProps();

    const Component = (type === "date" || type === "time") ? Touchable : View;

    const [toggleDate, dateOpen] = useToggle();

    const handleCountryChange = (countryData: CountryData): void => {
        if (countryData && onChangeCountry) {
            const countryInfo = {
                cca2: countryData?.cca2 || country,
                callingCode: countryData?.callingCode || []
            };
            onChangeCountry(countryInfo);
        }
    };

    const getPhoneInputValue = (): string => {
        return value && typeof value === 'string' ? value : "";
    };

    const getTextInputValue = (): string => {
        if (!value || typeof value !== 'string') return "";

        if (type === "time" && value !== "") {
            return timeFormatter(value);
        }
        return value;
    };

    const getDefaultCountryCode = (): string => {
        if (country && typeof country === 'string' && country.length === 2) {
            return country;
        }
        return "AE";
    };

    const handleDateConfirm = (date: Date): void => {
        if (toggleDate) {
            toggleDate();
        }
        if (onChangeText) {
            const formattedDate = type === "time" ? date.toISOString() : dateFormatter(date);
            onChangeText(formattedDate);
        }
    };

    const handleDateCancel = (): void => {
        if (toggleDate) {
            toggleDate();
        }
    };

    return (
        <View style={styles.container}>
            {label && (
                <Text size={16} weight="semibold" color={colors.black} style={styles.label}>
                    {label}
                    {required && <Text size={12} weight="semibold" color={colors.danger}>*</Text>}
                </Text>
            )}
            {
                type === "phone" ?
                    <PhoneInput
                        ref={phoneRef}
                        layout='first'
                        disabled={disabled}
                        placeholder={placeholder}
                        defaultValue={getPhoneInputValue()}
                        value={getPhoneInputValue()}
                        defaultCode={getDefaultCountryCode() as any}
                        onChangeText={onChangeText}
                        onChangeCountry={handleCountryChange}
                        containerStyle={[
                            {
                                padding: 0,
                                backgroundColor: colors.transparent,
                                gap: heightPixel(10),
                                width: "100%"
                            }
                        ]}
                        textInputStyle={[
                            styles.input,
                            {
                                padding: 0,
                                backgroundColor: colors.transparent,
                                color: colors.black
                            }
                        ]}
                        codeTextStyle={{
                            fontFamily: fonts.sfpro.regular,
                            margin: 0,
                            padding: 0,
                            color: colors.black,
                            fontSize: font(14)
                        }}
                        flagButtonStyle={{
                            backgroundColor: colors.transparent,
                            margin: 0
                        }}
                        textContainerStyle={{
                            paddingHorizontal: widthPixel(15),
                            paddingVertical: 0,
                            backgroundColor: colors.transparent,
                            borderWidth: heightPixel(1),
                            borderColor: colors.medium_gray,
                            borderRadius: heightPixel(5)
                        }}
                        countryPickerButtonStyle={{
                            borderWidth: heightPixel(1),
                            borderColor: colors.medium_gray,
                            borderRadius: heightPixel(5)
                        }}
                        textInputProps={{
                            cursorColor: colors.primary,
                            placeholderTextColor: colors.dark_gray,
                            editable: !disabled
                        }}
                        countryPickerProps={{
                            renderFlagButton: false,
                            onBackPress: () => { }
                        }}
                        disableArrowIcon={false}
                    />
                    :
                    <Component
                        style={[
                            styles.inputContainer,
                            isFocused && mode !== "secondary" && styles.focusedInputContainer,
                            type === "textarea" && styles.multiline_input_container,
                            mode === "secondary" ? { borderColor: colors.transparent, backgroundColor: colors.grayish_black } : {}
                        ]}
                        onPress={toggleDate}
                        disabled={disabled}
                    >
                        <TextInput
                            allowFontScaling={false}
                            style={[
                                styles.input,
                                type === "textarea" ? styles.multiline_input : {},
                                height ? { height: heightPixel(height) } : {},
                                mode === "secondary" ? { color: colors.white } : {}
                            ]}
                            placeholder={placeholder}
                            placeholderTextColor={mode === "secondary" ? colors.light_gray : colors.dark_gray}
                            secureTextEntry={isPasswordVisible}
                            selectionColor={colors.primary}
                            cursorColor={mode === "secondary" ? colors.white : colors.primary}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            value={getTextInputValue()}
                            onChangeText={onChangeText}
                            onSubmitEditing={onSubmitEditing}
                            maxLength={maxLength}
                            multiline={type === "textarea"}
                            textAlignVertical={type === "textarea" ? "top" : "center"}
                            editable={(type !== "date" && type !== "time") && !disabled}
                            returnKeyType="search"
                            {...keyboardProps}
                        />
                        {
                            (type === 'password' || type === 'date') ? (
                                <TouchableOpacity
                                    onPress={togglePasswordVisibility}
                                    disabled={type !== 'password'}
                                    hitSlop={createInsets(15)}
                                >
                                    <Icon
                                        source={
                                            type === 'password'
                                                ? (!isPasswordVisible ? images.eye : images.eye_slash)
                                                : type === "date"
                                                    ? images.calendar
                                                    : null
                                        }
                                        size={18}
                                        tint_color={colors.medium_gray}
                                    />
                                </TouchableOpacity>
                            ) : icon ?
                                <Icon source={icon} size={18} /> : null
                        }
                    </Component>
            }
            {error && (
                <Text size={12} color={colors.danger} style={styles.error}>
                    {error}
                </Text>
            )}
            {
                (type === "date" || type === "time") &&
                <DatePicker
                    mode={type as 'date' | 'time'}
                    modal
                    open={dateOpen}
                    date={value && typeof value === 'string' ? new Date(value) : new Date()}
                    onConfirm={handleDateConfirm}
                    onCancel={handleDateCancel}
                />
            }
        </View >
    );
};

export default memo(Input);