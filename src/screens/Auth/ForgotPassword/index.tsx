import { Formik } from "formik"
import AuthWrapper from "../../../components/AuthWrapper"
import Button from "../../../components/Button"
import Input from "../../../components/Input"
import Text from "../../../components/Text"
// import styles from "../styles"
import useForgotPasswordController from "./useForgotPasswordController"
import { heightPixel } from "../../../utils/helper"
import colors from "../../../utils/colors"

const ForgotPassword = () => {

    const {
        schema,
        refs: {
            formik_ref
        },
        values: {
            initial,
            is_email,
            isLoading
        },
        functions: {
            onSubmit,
            onPressBackToLogin,
        }
    } = useForgotPasswordController()

    return (
        <AuthWrapper
            title='Forgot Password'
            logo={false}
        >
            <Formik
                innerRef={formik_ref}
                initialValues={initial}
                validationSchema={schema}
                onSubmit={onSubmit}
            >
                {({ values: data, errors, touched, handleSubmit, handleChange, setFieldValue }) => (
                    <>
                        {
                            is_email ? (
                                <Input
                                    label={"Email Address"}
                                    placeholder={"Enter Email Address"}
                                    type={"email"}
                                    required
                                    value={data?.email}
                                    onChangeText={handleChange("email")}
                                    error={touched?.email ? errors?.email : ""}
                                />
                            ) : (
                                <Input
                                    label={"Phone Number"}
                                    placeholder={"Enter Phone Number"}
                                    type={"phone"}
                                    required
                                    value={data?.phone}
                                    error={touched?.phone ? errors?.phone : ""}
                                    onChangeText={handleChange("phone")}
                                    onChangeCountry={e => setFieldValue("calling_code", e?.callingCode?.[0])}
                                />
                            )
                        }
                        <Button text={"Continue"} onPress={handleSubmit} loading={isLoading} style={{ marginVertical: heightPixel(40) }} />
                    </>
                )}
            </Formik>
            <Text position="center" color={colors.dark_gray} onPress={onPressBackToLogin}>Back To <Text underline weight="semibold" color={colors.secondary}>Login</Text></Text>
        </AuthWrapper>
    )
}

export default ForgotPassword