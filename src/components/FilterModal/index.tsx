import { BlurView } from "@react-native-community/blur"
import { FC, useEffect, useState } from "react"
import { Modal, View } from "react-native"
import images from "../../assets/images"
import { IFilterModal } from "../../interfaces"
import { useGetDataQuery } from "../../redux/Apis/General"
import colors from "../../utils/colors"
import Button from "../Button"
import Checkbox from "../Checkbox"
import Icon from "../Icon"
import Row from "../Row"
import Text from "../Text"
import styles from "./styles"

const FilterModal: FC<IFilterModal> = ({ open, filters, handleClose, onApply }) => {

    const { data } = useGetDataQuery({})

    const [selected, setSelected] = useState<number[]>([])

    useEffect(() => {
        if (filters && filters.length > 0) {
            setSelected(filters)
        }
    }, [filters])

    const handleSelect = (id: number) => {
        if (selected.includes(id)) {
            setSelected(prev => prev.filter(item => item !== id))
        } else {
            setSelected(prev => [...prev, id])
        }
    }

    const handleClear = () => {
        setSelected([])
        onApply([])
        handleClose()
    }

    const handleApply = () => {
        onApply(selected)
        handleClose()
    }

    return (
        <Modal visible={open} statusBarTranslucent animationType="fade">
            <View style={styles.container}>
                <BlurView style={styles.blur} blurType="dark" blurRadius={2} />
                <View style={styles.modal_content}>
                    <Row align="center" justify="center" style={styles.header_row}>
                        <View style={styles.header_left}>
                            <Icon
                                source={images.back}
                                border={colors.black}
                                rounded
                                less_rounded
                                less_padding
                                size={42}
                                onPress={handleClose}
                            />
                        </View>
                        <View style={styles.header_center}>
                            <Text weight="bold" size={23}>
                                Filter
                            </Text>
                        </View>
                        <View style={styles.header_right} />
                    </Row>
                    <Row style={styles.checkbox_row} align="center" justify="space-between">
                        {
                            data?.data?.categories.map((item: { label: string, value: number }) => (
                                <View key={item.value} style={styles.checkbox_wrapper}>
                                    <Checkbox
                                        label={item.label}
                                        checked={selected.includes(item.value)}
                                        onPress={() => handleSelect(item.value)}
                                    />
                                </View>
                            ))
                        }
                    </Row>
                    <Row style={styles.action_row} align="center" justify="space-between">
                        <Button text="Apply" style={styles.button_style} onPress={handleApply} />
                        <Button text="Clear" type="secondary" style={styles.button_style} onPress={handleClear} />
                    </Row>
                </View>
            </View>
        </Modal>
    )
}

export default FilterModal