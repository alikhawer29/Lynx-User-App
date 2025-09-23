import { Formik } from "formik"
import OTPTextView from "react-native-otp-textinput"
import AuthWrapper from "../../../components/AuthWrapper"
import Button from "../../../components/Button"
import Row from "../../../components/Row"
import Text from "../../../components/Text"
import colors from "../../../utils/colors"
import { formatTimer } from "../../../utils/helper"
import useVerifyCodeController from "./useVerifyCodeController"
import styles from "./styles"
import { View } from "react-native"

const VerifyCode = () => {

    const {
        schema,
        refs: {
            formik_ref
        },
        values: {
            initial,
            timer,
            isLoading,
            isForgotPasswordLoading
        },
        functions: {
            onPressBackToLogin,
            onSubmit,
            onResend
        }
    } = useVerifyCodeController()

    return (
        <AuthWrapper
            title="Forgot Password"
            subtitle="Enter your verification code that we send you on email address"
            logo={false}
        >
            <Formik
                innerRef={formik_ref}
                initialValues={initial}
                validationSchema={schema}
                onSubmit={onSubmit}
            >
                {({ handleSubmit, handleChange, errors, touched }) => (
                    <>
                        <View style={styles.otp_wrapper}>
                            <Text size={16} weight="semibold" color={colors.black} style={styles.label}>
                                Verification Code{" "}
                                <Text size={12} weight="semibold" color={colors.danger}>
                                    *
                                </Text>
                            </Text>
                            <OTPTextView
                                textInputStyle={styles.otp_input}
                                containerStyle={styles.otp_container}
                                tintColor={colors.primary}
                                handleTextChange={handleChange("otp")}
                            />
                            {
                                touched?.otp && errors?.otp &&
                                <Text size={12} color={colors.danger} style={styles.error}>
                                    {errors?.otp}
                                </Text>
                            }
                        </View>
                        <Row justify="space-between">
                            <Text>{formatTimer(timer)}</Text>
                            <Text
                                weight="semibold"
                                underline
                                onPress={onResend}
                                color={timer > 0 ? colors.medium_gray : colors.black}
                            >
                                {isForgotPasswordLoading ? "Resending Code ..." : "Resend Code"}
                            </Text>
                        </Row>

                        <Button
                            text={"Continue"}
                            style={styles.button}
                            onPress={handleSubmit}
                            loading={isLoading}
                        />
                    </>
                )}
            </Formik>
            <Text position="center" color={colors.dark_gray} onPress={onPressBackToLogin}>
                Back To{" "}
                <Text underline weight="semibold" color={colors.secondary}>
                    Login
                </Text>
            </Text>
        </AuthWrapper>
    )
}

export default VerifyCode