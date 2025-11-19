import { View, ScrollView } from "react-native"
import Text from "../../components/Text"
import Wrapper from "../../components/Wrapper"
import styles from "./styles"
import useAboutUsController from "./useAboutUsController"

const AboutUs = () => {

    const {
        values: {
            contentData,
            contentLoading,
            error
        }
    } = useAboutUsController()

    if (contentLoading) {
        return (
            <Wrapper>
                <View style={styles.loadingContainer}>
                    <Text>Loading...</Text>
                </View>
            </Wrapper>
        )
    }

    if (error) {
        return (
            <Wrapper>
                <View style={styles.errorContainer}>
                    <Text>Failed to load content. Please try again.</Text>
                </View>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    {/* About Us Section Only */}
                    <Text weight="bold" size={23} style={styles.sectionTitle}>Lynx Consultancy About Us</Text>
                    <Text style={styles.aboutText}>
                        {contentData?.about_us || "No content available."}
                    </Text>

                </View>
            </ScrollView>
        </Wrapper>
    )
}

export default AboutUs