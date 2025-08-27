import { Formik } from "formik"
import Button from "../../components/Button"
import Input from "../../components/Input"
import Wrapper from "../../components/Wrapper"
import styles from "./styles"
import useChangePasswordController from "./useChangePasswordController"

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
                    <>
                        <Input
                            label="Old Password"
                            required
                            type="password"
                            placeholder="Enter Old Password"
                            value={data?.old_password}
                            onChangeText={handleChange("old_password")}
                            error={touched?.old_password ? errors?.old_password : ""}
                        />
                        <Input
                            label="New Password"
                            required
                            type="password"
                            placeholder="Enter New Password"
                            value={data?.password}
                            onChangeText={handleChange("password")}
                            error={touched?.password ? errors?.password : ""}
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
                    </>
                )}
            </Formik>
        </Wrapper>
    )
}

export default ChangePassword