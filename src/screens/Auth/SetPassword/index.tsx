import { Formik } from "formik"
import AuthWrapper from "../../../components/AuthWrapper"
import Button from "../../../components/Button"
import Input from "../../../components/Input"
import Text from "../../../components/Text"
import colors from "../../../utils/colors"
import { heightPixel } from "../../../utils/helper"
import useSetPasswordController from "./useSetPasswordController"

const SetPassword = () => {

    const {
        schema,
        refs: {
            formik_ref
        },
        values: {
            initial,
            isLoading
        },
        functions: {
            onPressBackToLogin,
            onSubmit
        }
    } = useSetPasswordController()

    return (
        <AuthWrapper title='Forgot Password' subtitle='Set a new password for your account' logo={false}>
            <Formik
                innerRef={formik_ref}
                initialValues={initial}
                validationSchema={schema}
                onSubmit={onSubmit}
            >
                {({ values: data, handleSubmit, handleChange, errors, touched }) => (
                    <>
                        <Input
                            label="Password"
                            placeholder="Enter Password"
                            type="password"
                            required
                            value={data?.password}
                            onChangeText={handleChange("password")}
                            error={touched?.password ? errors?.password : ""}
                        />
                        <Input
                            label="Confirm Password"
                            placeholder="Set Confirm Password"
                            type="password"
                            required
                            value={data?.password_confirmation}
                            onChangeText={handleChange("password_confirmation")}
                            error={touched?.password_confirmation ? errors?.password_confirmation : ""}
                        />
                        <Button text={"Update"} onPress={handleSubmit} loading={isLoading} style={{ marginVertical: heightPixel(40) }} />
                    </>
                )}
            </Formik>
            <Text position="center" color={colors.dark_gray} onPress={onPressBackToLogin}>Back To <Text underline weight="semibold" color={colors.secondary}>Login</Text></Text>
        </AuthWrapper>
    )
}

export default SetPassword