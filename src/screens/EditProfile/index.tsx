import { View } from "react-native"
import Input from "../../components/Input"
import Row from "../../components/Row"
import Wrapper from "../../components/Wrapper"
import useEditProfileController from "./useEditProfileController"
import Button from "../../components/Button"
import { heightPixel } from "../../utils/helper"
import Dropdown from "../../components/Dropdown"
import { Formik } from "formik"
import Icon from "../../components/Icon"
import images from "../../assets/images"
import colors from "../../utils/colors"

const EditProfile = () => {

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
            onSubmit
        }
    } = useEditProfileController()

    return (
        <Wrapper>
            <Formik
                innerRef={formik_ref}
                initialValues={initial}
                validationSchema={schema}
                onSubmit={onSubmit}
            >
                {({ values: data, handleSubmit, handleChange, setFieldValue, errors, touched }) => (
                    <>
                        <View style={{ marginVertical: heightPixel(20), alignItems: "center" }}>
                            <View>
                                <Icon size={110} source={images.profile} />
                                <View style={{ position: "absolute", right: 2, bottom: 0 }}>
                                    <Icon source={images.camera} color={colors.white} border={colors.primary} rounded less_padding size={30} />
                                </View>
                            </View>
                        </View>
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
                            label="Phone Number"
                            required
                            placeholder="Enter Phone Number"
                            type="phone"
                            value={data?.phone}
                            onChangeText={handleChange("phone")}
                            error={touched?.phone ? errors?.phone : ""}
                            country={data?.country_code}
                            onChangeCountry={e => {
                                setFieldValue("country_code", e?.cca2)
                                setFieldValue("dialing_code", e?.callingCode?.[0])
                            }}
                        />
                        {console.log("hello", data?.language)}
                        <Dropdown
                            required
                            label="Language"
                            options={languages}
                            value={data?.language}
                            onChangeText={(e) => setFieldValue("language", e?.value)}
                            error={touched?.language && errors?.language}
                        />
                        <Button text="Update" loading={isLoading} style={{ marginVertical: heightPixel(40) }} onPress={handleSubmit} />
                    </>
                )}
            </Formik>
        </Wrapper>
    )
}

export default EditProfile