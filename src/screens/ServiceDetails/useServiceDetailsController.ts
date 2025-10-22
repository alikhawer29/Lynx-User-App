import { RouteProp, useRoute } from "@react-navigation/native"
import { useCallback, useState } from "react"
import { useModal } from "../../contexts/ModalContext"
import { useAppSelector } from "../../hooks"
import { ServiceStackParamList } from "../../interfaces"
import { useGetServicesQuery } from "../../redux/Apis/Service"
import { selectLoggedIn } from "../../redux/Slices/AuthSlice"

type ServiceDetailsRouteProp = RouteProp<ServiceStackParamList, 'ServiceDetails'>

const useServiceDetailsController = () => {

    const authorize = useAppSelector(selectLoggedIn)
    const { params } = useRoute<ServiceDetailsRouteProp>()
    const { showOkModal } = useModal()

    const [selected, setSelected] = useState<number>(0)

    const { data, isFetching: isLoading } = useGetServicesQuery({ id: params?.id }, { skip: !params?.id })

    const onBookAppointment = useCallback(() => {
        if (!authorize) {
            showOkModal({
                type: "success",
                title: "Login",
                message: "You have to login first"
            })
        }
    }, [])

    const onSelectTier = useCallback((tier: number) => {
        setSelected(tier)
    }, [selected])

    return {
        values: {
            data: data?.data || null,
            isLoading,
            selected
        },
        functions: {
            onBookAppointment,
            onSelectTier
        }
    }

}

export default useServiceDetailsController