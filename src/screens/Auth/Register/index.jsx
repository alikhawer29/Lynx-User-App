import { Formik } from "formik"
import { View } from "react-native"
import AuthWrapper from "../../../components/AuthWrapper"
import Button from "../../../components/Button"
import Input from "../../../components/Input"
import Row from "../../../components/Row"
import Text from "../../../components/Text"
import colors from "../../../utils/colors"
import { heightPixel } from "../../../utils/helper"
import useRegisterController from "./useRegisterController"
import Upload from "../../../components/Upload"
import Dropdown from "../../../components/Dropdown"

const Register = () => {

    const {
        schema,
        refs: {
            formik_ref
        },
        values: {
            initial,
            isLoading,
            languages
        },
        functions: {
            onPressLogin,
            onSubmit
        }
    } = useRegisterController()

    return (
        <AuthWrapper title='Register'>
            <Formik
                innerRef={formik_ref}
                initialValues={initial}
                validationSchema={schema}
                onSubmit={onSubmit}
            >
                {({ values: data, handleSubmit, handleChange, setFieldValue, errors, touched }) => (
                    <>
                        <Row gap={20}>
                            <View style={{ flex: 0.5 }}>
                                <Input
                                    label="First Name"
                                    required
                                    placeholder="Enter First Name"
                                    value={data?.first_name}
                                    onChangeText={handleChange("first_name")}
                                    error={touched?.first_name ? errors?.first_name : ""}
                                />
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Input
                                    label="Last Name"
                                    required
                                    placeholder="Enter Last Name"
                                    value={data?.last_name}
                                    onChangeText={handleChange("last_name")}
                                    error={touched?.last_name ? errors?.last_name : ""}
                                />
                            </View>
                        </Row>
                        <Input
                            label="Email Address"
                            required
                            placeholder="Enter Email Address"
                            type="email"
                            value={data?.email}
                            onChangeText={handleChange("email")}
                            error={touched?.email ? errors?.email : ""}
                        />
                        <Input
                            type="phone"
                            label="Phone Number"
                            required
                            placeholder="Enter Phone Number"
                            value={data?.phone}
                            onChangeText={handleChange("phone")}
                            error={touched?.phone ? errors?.phone : ""}
                            country={data?.country_code}
                            onChangeCountry={e => {
                                setFieldValue("country_code", e?.cca2)
                                setFieldValue("dialing_code", e?.callingCode?.[0])
                            }}
                        />
                        <Dropdown
                            required
                            label="Language"
                            options={languages}
                            value={data?.language}
                            onChangeText={(e) => setFieldValue("language", e?.value)}
                            error={touched?.language && errors?.language}
                        />
                        <Input
                            label="Password"
                            required
                            placeholder="Enter Password"
                            type="password"
                            value={data?.password}
                            onChangeText={handleChange("password")}
                            error={touched?.password ? errors?.password : ""}
                        />
                        <Input
                            label="Confirm Password"
                            required
                            placeholder="Confirm Password"
                            type="password"
                            value={data?.password_confirmation}
                            onChangeText={handleChange("password_confirmation")}
                            error={touched?.password_confirmation ? errors?.password_confirmation : ""}
                        />
                        <Upload text="Upload Profile Image" required style={{ marginVertical: heightPixel(7.5) }} />
                        <Button text="Register" style={{ marginVertical: heightPixel(40) }} onPress={handleSubmit} loading={isLoading} />
                        <Text position="center" color={colors.dark_gray} onPress={onPressLogin}>Already have an account? <Text underline weight="semibold" position="center" color={colors.secondary}>Login</Text></Text>
                    </>
                )}
            </Formik>
        </AuthWrapper>
    )
}

export default Register