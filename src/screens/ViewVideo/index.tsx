import { View } from "react-native"
import Video from "react-native-video"
import images from "../../assets/images"
import Button from "../../components/Button"
import Icon from "../../components/Icon"
import Loader from "../../components/Loader"
import Row from "../../components/Row"
import Text from "../../components/Text"
import Wrapper from "../../components/Wrapper"
import colors from "../../utils/colors"
import { dateFormatter, formatDuration } from "../../utils/helper"
import styles from "./styles"
import useViewVideoController from "./useViewVideoController"

const ViewVideo = () => {

    const {
        values: {
            data,
            isLoading,
            duration,
            currentDuration,
            saved_offline,
            isSaving
        },
        refs: {
            video_ref
        },
        functions: {
            onEnd,
            onLoad,
            onProgress,
            onSave
        }
    } = useViewVideoController()

    return (
        <Wrapper scroll>
            {
                isLoading ? (
                    <Loader text="Loading" size={35} vertical={30} />
                ) : (
                    <>
                        <View style={styles.video_container}>
                            <Video
                                ref={video_ref}
                                resizeMode="cover"
                                poster={{ source: { uri: data?.media_thumbnail_url } }}
                                paused
                                source={{ uri: data?.media_url }}
                                style={styles.video}
                                onLoad={onLoad}
                                onProgress={onProgress}
                                onEnd={onEnd}
                            />
                            <Row align="center" style={styles.control_container}>
                                <Row gap={10} align="center" style={styles.time_row}>
                                    <Icon size={16} color={colors.pure_black} rounded onPress={() => video_ref.current?.resume()} />
                                    <Text size={9} color={colors.pure_black}>
                                        {formatDuration(currentDuration)} / {formatDuration(duration)}
                                    </Text>
                                </Row>
                                <View style={styles.progress_bar}>
                                    <View style={[styles.progress_fill, { width: `${(currentDuration / duration) * 100}%` }]} />
                                </View>
                            </Row>
                        </View>

                        <Row style={styles.title_row}>
                            <View style={styles.title_section}>
                                <Text weight="bold" size={20} color={colors.pure_black} line_height={25}>
                                    {data?.title}
                                </Text>
                            </View>
                            <Row align="center" justify="flex-end" style={styles.date_section} gap={5}>
                                <Icon source={images.calendar} tint_color={colors.dark_gray} size={12} />
                                <Text size={12}>{dateFormatter(data?.createdAt)}</Text>
                            </Row>
                        </Row>

                        <Text color={colors.dark_gray}>{data?.description}</Text>

                        <View style={styles.offline_button_wrapper}>
                            <Button font_size={12} text={saved_offline ? "Remove From Offline" : "Save as Offline"} height={40} style={styles.offline_button} onPress={onSave} loading={isSaving} />
                        </View>
                    </>
                )
            }
        </Wrapper>
    )
}

export default ViewVideo