
import { View } from "react-native"
import Button from "../../components/Button"
import Input from "../../components/Input"
import Text from "../../components/Text"
import Wrapper from "../../components/Wrapper"
import colors from "../../utils/colors"
import styles from "./styles"
import useLocationViewController from "./useLocationViewController"
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
const LocationView = () => {

    const {
        values: {
            searchAddress,
            isConfirmed,
            selectedCity,
            markerCoords,
            floor,
            viewOnly
        },
        functions: {
            onChangeSearch,
            onConfirm,
            onEditAddress,
            onMarkerDragEnd,
            onChangeFloor,
            onSearchConfirm
        },
        refs: {
            mapRef
        }
    } = useLocationViewController()

    console.log(isConfirmed, 'isConfirmed')

    return (
        <Wrapper>
            {/* Search Input at Top - Only show if not in view-only mode */}
            {!viewOnly && (
                <View style={styles.search_container}>
                    <Input
                        placeholder="Search Address..."
                        type="text"
                        value={searchAddress}
                        onChangeText={onChangeSearch}
                        onSubmitEditing={onSearchConfirm}
                    />
                </View>
            )}

            {/* Title */}
            <Text size={18} weight="bold" position="center" style={styles.title}>
                {viewOnly ? '' : (isConfirmed ? 'Is This Your Exact Location' : '')}
            </Text>

            {/* Map Container */}
            <View style={styles.map_container}>
                <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map_placeholder}
                    initialRegion={{
                        latitude: markerCoords.latitude,
                        longitude: markerCoords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={markerCoords}
                        title="Selected Location"
                        description={searchAddress}
                        draggable={!viewOnly}
                        onDragEnd={onMarkerDragEnd}
                    />
                </MapView>
            </View>

            {/* Confirm Button - Only show if not in view-only mode */}
            {!viewOnly && (
                <View style={styles.button_container}>
                    <Button
                        text="Confirm"
                        type="primary"
                        onPress={onConfirm}
                    />
                </View>
            )}
        </Wrapper>
    )
}

export default LocationView

