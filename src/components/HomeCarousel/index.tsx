import React, { FC, memo, useCallback, useRef, useState } from "react"
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, View } from "react-native"
import { ServiceData } from "../../interfaces"
import { chunkArray, vw } from "../../utils/helper"
import { navigate } from "../../utils/navigation"
import { ROUTES } from "../../utils/routes"
import FeaturedServiceCard from "../Cards/FeaturedServiceCard"
import styles from "./styles"

interface HomeCarouselProps {
    data: ServiceData[];
    onFavorite: (id: string) => void;
}

const HomeCarousel: FC<HomeCarouselProps> = ({ data, onFavorite }) => {

    const [page, setPage] = useState<number>(0)
    const flatListRef = useRef<FlatList<ServiceData[]> | null>(null)

    const onPressDetail = useCallback((id: string) => {
        navigate(ROUTES.SERVICE_DETAILS, { id })
    }, [])

    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x
        const currentPage = Math.round(contentOffsetX / (vw * 100))
        setPage(currentPage)
    }

    const pages = chunkArray<ServiceData>(data, 2)

    const renderPage = ({ item }: { item: ServiceData[] }) => (
        <View style={styles.page}>
            {item.map((service) => <FeaturedServiceCard key={service._id} data={service} onPress={() => onPressDetail(service._id)} onFavorite={() => onFavorite(service?._id)} />)}
        </View>
    )

    return (
        <View>
            <FlatList
                ref={flatListRef}
                data={pages}
                renderItem={renderPage}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
            />
            <View style={styles.pagination}>
                {pages.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            page === index ? styles.active_dot : styles.dot,
                        ]}
                    />
                ))}
            </View>
        </View>
    )
}

export default memo(HomeCarousel)