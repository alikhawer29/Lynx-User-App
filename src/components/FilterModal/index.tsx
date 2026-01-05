import { BlurView } from "@react-native-community/blur"
import { FC, useEffect, useState } from "react"
import { Modal, TouchableWithoutFeedback, View } from "react-native"
import images from "../../assets/images"
import { IFilterModal } from "../../interfaces"
import { useGetAllActiveCategoriesQuery } from "../../redux/Apis/Category"
import colors from "../../utils/colors"
import Button from "../Button"
import Checkbox from "../Checkbox"
import Icon from "../Icon"
import Row from "../Row"
import Text from "../Text"
import styles from "./styles"

const FilterModal: FC<IFilterModal> = ({ open, filters, handleClose, onApply }) => {

    const { data: categoriesData, isLoading } = useGetAllActiveCategoriesQuery({})

    const [selected, setSelected] = useState<string[]>([])

    useEffect(() => {
        if (filters && filters.length > 0) {
            setSelected(filters)
        } else {
            setSelected([])
        }
    }, [filters, open])

    const handleSelect = (id: string) => {
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
            <TouchableWithoutFeedback onPress={handleClose} accessible={false}>
                <View style={styles.container}>
                    <BlurView style={styles.blur} blurType="dark" blurRadius={2} />
                    <TouchableWithoutFeedback>
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
                                    isLoading ? (
                                        <Text>Loading categories...</Text>
                                    ) : (
                                        categoriesData?.data?.map((item: { _id: string, name: string }) => (
                                            <View key={item._id} style={styles.checkbox_wrapper}>
                                                <Checkbox
                                                    label={item.name}
                                                    checked={selected.includes(item._id)}
                                                    onPress={() => handleSelect(item._id)}
                                                />
                                            </View>
                                        ))
                                    )
                                }
                            </Row>
                            <Row style={styles.action_row} align="center" justify="space-between">
                                <Button text="Apply" style={styles.button_style} onPress={handleApply} />
                                <Button text="Clear" type="secondary" style={styles.button_style} onPress={handleClear} />
                            </Row>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default FilterModal