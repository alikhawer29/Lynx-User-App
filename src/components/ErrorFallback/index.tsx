import React, { FC, memo } from "react"
import { DevSettings, Image, View } from "react-native"
import images from "../../assets/images"
import colors from "../../utils/colors"
import Button from "../Button"
import Text from "../Text"
import Wrapper from "../Wrapper"
import styles from "./styles"

const ErrorFallback: FC = () => {
    return (
        <Wrapper>
            <View style={styles.container}>
                <Image
                    source={images.modal_cross}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text size={22} weight="bold" color={colors.primary} style={styles.title} line_height={30}>
                    Oops! Something went wrong
                </Text>
                <Text
                    size={16}
                    color={colors.dark_gray}
                    style={styles.message}
                    position="center"
                >
                    We’re having trouble loading the page. Please try again.
                </Text>
                <Button
                    text="Retry"
                    type="secondary"
                    style={styles.button}
                    onPress={DevSettings.reload}
                />
            </View>
        </Wrapper>
    )
}

export default memo(ErrorFallback)