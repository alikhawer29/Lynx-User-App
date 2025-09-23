import { RouteProp, useRoute } from "@react-navigation/native"
import { useCallback } from "react"
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

    return {
        values: {
            data: data?.data || null,
            isLoading
        },
        functions: {
            onBookAppointment
        }
    }

}

export default useServiceDetailsController