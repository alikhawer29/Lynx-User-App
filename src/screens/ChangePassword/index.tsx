import { Formik } from "formik"
import Button from "../../components/Button"
import Input from "../../components/Input"
import Wrapper from "../../components/Wrapper"
import styles from "./styles"
import useChangePasswordController from "./useChangePasswordController"
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper"

const ChangePassword = () => {

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
            onSubmit
        }
    } = useChangePasswordController()

    return (
        <Wrapper>
            <Formik
                innerRef={formik_ref}
                initialValues={initial}
                validationSchema={schema}
                onSubmit={onSubmit}
            >
                {({ values: data, handleSubmit, handleChange, errors, touched }) => (
                    <KeyboardAvoidingWrapper>
                        <Input
                            label="Old Password"
                            required
                            type="password"
                            placeholder="Enter Old Password"
                            value={data?.current_password}
                            onChangeText={handleChange("current_password")}
                            error={touched?.current_password ? errors?.current_password : ""}
                        />
                        <Input
                            label="New Password"
                            required
                            type="password"
                            placeholder="Enter New Password"
                            value={data?.new_password}
                            onChangeText={handleChange("new_password")}
                            error={touched?.new_password ? errors?.new_password : ""}
                        />
                        <Input
                            label="Confirm Password"
                            required
                            type="password"
                            placeholder="Confirm Password"
                            value={data?.password_confirmation}
                            onChangeText={handleChange("password_confirmation")}
                            error={touched?.password_confirmation ? errors?.password_confirmation : ""}
                        />
                        <Button text="Update" style={styles.button} onPress={handleSubmit} loading={isLoading} />
                    </KeyboardAvoidingWrapper>
                )}
            </Formik>
        </Wrapper>
    )
}

export default ChangePassword