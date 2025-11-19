import { useState } from "react"
import { Image, ScrollView, TouchableOpacity, View } from "react-native"
import images from "../../assets/images"
import Icon from "../../components/Icon"
import Text from "../../components/Text"
import Wrapper from "../../components/Wrapper"
import styles from "./styles"
import useFaqsController from "./useFaqsController"

// Define types
interface ExpandedItems {
    [key: string]: boolean;
}

const Faqs = () => {

    const {
        values: {
            contentData,
            contentLoading,
            error
        }
    } = useFaqsController()

    // State to track which FAQs are expanded with proper typing
    const [expandedItems, setExpandedItems] = useState<ExpandedItems>({})

    // Toggle expand/collapse for a specific FAQ with proper typing
    const toggleExpand = (faqId: string) => {
        setExpandedItems(prev => ({
            ...prev,
            [faqId]: !prev[faqId]
        }))
    }

    if (contentLoading) {
        return (
            <Wrapper>
                <View style={styles.loadingContainer}>
                    <Text>Loading FAQs...</Text>
                </View>
            </Wrapper>
        )
    }

    if (error) {
        return (
            <Wrapper>
                <View style={styles.errorContainer}>
                    <Text>Failed to load FAQs. Please try again.</Text>
                </View>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>

                    {contentData?.length > 0 ? (
                        contentData.map((faq: any, index: number) => {
                            const isExpanded = expandedItems[faq._id] || false

                            return (
                                <View key={faq._id || index} style={styles.faqItem}>
                                    <TouchableOpacity
                                        onPress={() => toggleExpand(faq._id)}
                                        style={styles.faqHeader}
                                        activeOpacity={0.7}
                                    >
                                        <View style={styles.questionContainer}>
                                            <Text weight="bold" size={16} style={styles.faqQuestion}>
                                                {faq.question}
                                            </Text>
                                        </View>
                                        <View style={styles.iconWrapper}>
                                            {isExpanded ? (
                                                <Icon source={images.up_arrow} size={15} />
                                            ) : (
                                                <Icon source={images.down_arrow} size={15} />
                                            )}
                                        </View>
                                    </TouchableOpacity>

                                    {/* Answer Content - Only show when expanded */}
                                    {isExpanded && (
                                        <View style={styles.faqAnswerContainer}>
                                            {/* Handle different answer types */}
                                            {faq.answer_type === 'text' && faq.answer_text && (
                                                <Text style={styles.faqAnswer}>
                                                    {faq.answer_text}
                                                </Text>
                                            )}

                                            {faq.answer_type === 'image' && faq.answer_url && (
                                                <View style={styles.imageContainer}>
                                                    <Image
                                                        source={{ uri: faq.answer_url }}
                                                        style={styles.faqImage}
                                                        resizeMode="cover"
                                                    />
                                                </View>
                                            )}

                                            {faq.answer_type === 'video' && faq.answer_url && (
                                                <View style={styles.videoContainer}>
                                                    <Text style={styles.videoText}>
                                                        Video content available
                                                    </Text>
                                                    <Text style={styles.videoLink}>
                                                        {faq.answer_url}
                                                    </Text>
                                                </View>
                                            )}

                                            {/* Fallback to answer_content if available */}
                                            {!faq.answer_text && !faq.answer_url && faq.answer_content && (
                                                <Text style={styles.faqAnswer}>
                                                    {faq.answer_content.text}
                                                </Text>
                                            )}

                                            {/* Show message if no content available */}
                                            {!faq.answer_text && !faq.answer_url && !faq.answer_content && (
                                                <Text style={styles.noAnswerText}>
                                                    No answer available for this question.
                                                </Text>
                                            )}
                                        </View>
                                    )}
                                </View>
                            )
                        })
                    ) : (
                        <View style={styles.noContentContainer}>
                            <Text style={styles.noContentText}>No FAQs available at the moment.</Text>
                            <Text style={styles.noContentSubText}>
                                Check back later for frequently asked questions.
                            </Text>
                        </View>
                    )}

                </View>
            </ScrollView>
        </Wrapper>
    )
}

export default Faqs