import { useCallback } from "react"
import { useSelector } from "react-redux"
import { useModal } from "../../contexts/ModalContext"
import { selectUser } from "../../redux/Slices/AuthSlice"
import { navigate } from "../../utils/navigation"
import { ROUTES } from "../../utils/routes"

const useMyProfileController = () => {

    const user = useSelector(selectUser)
    const { showOkModal, showYesNoModal } = useModal()

    const onDeleteAccount = () => {
        showYesNoModal({
            title: "Delete Account",
            message: "Are You Sure You Want To Delete Your Account?"
        }, () => {
            setTimeout(() => {
                showOkModal({
                    type: "success",
                    title: "Successfully",
                    message: "User Account Has Been Deleted Successfully"
                })
            }, 500)
        })
    }

    const onChangePassword = useCallback(() => {
        navigate(ROUTES.CHANGE_PASSWORD)
    }, [])

    const onEditProfile = useCallback(() => {
        navigate(ROUTES.EDIT_PROFILE)
    }, [])

    return {
        values: {
            user
        },
        functions: {
            onDeleteAccount,
            onChangePassword,
            onEditProfile
        }
    }
}

export default useMyProfileController