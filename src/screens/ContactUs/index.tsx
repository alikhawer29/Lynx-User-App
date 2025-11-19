import { Formik } from "formik"
import { View } from "react-native"
import Button from "../../components/Button"
import Input from "../../components/Input"
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper"
import Text from "../../components/Text"
import Wrapper from "../../components/Wrapper"
import colors from "../../utils/colors"
import styles from "./styles"
import useContactUsController from "./useContactUsController"

const ContactUs = () => {

    const {
        schema,
        refs: {
            formik_ref
        },
        values: {
            initial,
            isLoading,
        },
        functions: {
            onSubmit
        }
    } = useContactUsController()

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
                        <View style={styles.container}>
                            {/* <Text weight="bold" size={23} style={styles.item} position="left">Contact Us</Text> */}
                            <Text color={colors.dark_gray} style={styles.item}>Please let us know how we can improve your experience.</Text>
                            <Input
                                label="Full Name"
                                required
                                placeholder="Enter Full Name"
                                value={data?.name}
                                onChangeText={handleChange("name")}
                                error={touched?.name ? errors?.name : ""}
                            />
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
                                label="Subject"
                                required
                                placeholder="Enter Subject"
                                value={data?.subject}
                                onChangeText={handleChange("subject")}
                                error={touched?.subject ? errors?.subject : ""}
                            />
                            <Input
                                label="Message"
                                required
                                placeholder="Enter Message"
                                type="textarea"
                                value={data?.message}
                                onChangeText={handleChange("message")}
                                error={touched?.message ? errors?.message : ""}
                            />
                            <Button text="Submit" onPress={handleSubmit} loading={isLoading} style={styles.button} />
                        </View>
                    </KeyboardAvoidingWrapper>
                )}
            </Formik>
        </Wrapper>
    )
}

export default ContactUs