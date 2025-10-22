import { View } from "react-native"
import images from "../../assets/images"
import Button from "../../components/Button"
import Icon from "../../components/Icon"
import Image from "../../components/Image"
import Loader from "../../components/Loader"
import Row from "../../components/Row"
import Text from "../../components/Text"
import Wrapper from "../../components/Wrapper"
import colors from "../../utils/colors"
import { dateFormatter, heightPixel, widthPixel } from "../../utils/helper"
import useViewArticleController from "./useViewArticleController"

const ViewArticle = () => {

    const {
        values: {
            data,
            isLoading,
            isSaving,
            saved_offline
        },
        functions: {
            onSave,

        }
    } = useViewArticleController()

    return (
        <Wrapper scroll>
            {
                isLoading ?
                    <Loader text="Loading" size={35} vertical={30} /> :
                    <>

                        <Image source={{ uri: data?.media_url }} style={{ height: heightPixel(220), width: "100%", borderRadius: heightPixel(10) }} resize="cover" />
                        <Row style={{ marginVertical: heightPixel(15) }}>
                            <View style={{ width: "70%" }}>
                                <Text weight="bold" size={20} color={colors.pure_black} line_height={25}>{data?.title}</Text>
                            </View>
                            <Row align="center" justify="flex-end" style={{ width: "30%" }} gap={5}>
                                <Icon source={images.calendar} tint_color={colors.dark_gray} size={12} />
                                <Text size={12}>{dateFormatter(data?.createdAt)}</Text>
                            </Row>
                        </Row>
                        <Text color={colors.dark_gray}>{data?.description}</Text>
                        <View style={{ marginVertical: heightPixel(15), width: "40%" }}>
                            <Button font_size={12} text={saved_offline ? "Remove From Offline" : "Save as Offline"} height={40} style={{ paddingHorizontal: widthPixel(10) }} onPress={onSave} loading={isSaving} />
                        </View>
                    </>
            }
        </Wrapper>
    )
}

export default ViewArticle