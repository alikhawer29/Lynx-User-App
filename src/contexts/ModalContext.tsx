import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";
import {
    Image,
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { BlurView } from "@react-native-community/blur";

import images from "../assets/images";
import Button from "../components/Button";
import Icon from "../components/Icon";
import Text from "../components/Text";
import colors from "../utils/colors";
import { heightPixel } from "../utils/helper";

//
// ---------- Types ----------
//

type ModalData = {
    type?: "success" | "warning" | "error" | "info";
    title?: string;
    message?: string;
};

type ModalContextType = {
    showOkModal: (data: ModalData, onConfirm?: () => void, onCancel?: () => void) => void;
    showYesNoModal: (
        data: ModalData,
        onConfirm: () => void,
        onCancel?: () => void
    ) => void;
    showInformativeModal: (
        data: ModalData,
        onConfirm?: () => void,
        onCancel?: () => void
    ) => void;
    hideModal: () => void;
};

//
// ---------- Context ----------
//

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
    const ctx = useContext(ModalContext);
    if (!ctx) {
        throw new Error("useModal must be used within ModalProvider");
    }
    return ctx;
};

//
// ---------- Provider ----------
//

type ModalProviderProps = {
    children: ReactNode;
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [modalType, setModalType] = useState<"ok" | "yesNo" | "info" | null>(
        null
    );

    const [modalContent, setModalContent] = useState<
        ModalData & {
            onConfirm?: () => void;
            onCancel?: () => void;
        }
    >({
        type: "success",
        title: "",
        message: "",
        onConfirm: () => { },
        onCancel: () => { },
    });

    const showOkModal: ModalContextType["showOkModal"] = (data, onConfirm, onCancel) => {
        setModalType("ok");
        setModalContent({
            ...data,
            onConfirm: onConfirm ?? (() => setIsVisible(false)),
            onCancel: () => {
                setIsVisible(false)
                if (onCancel) {
                    onCancel()
                }
            },
        });
        setIsVisible(true);
    };

    const showYesNoModal: ModalContextType["showYesNoModal"] = (
        data,
        onConfirm,
        onCancel
    ) => {
        setModalType("yesNo");
        setModalContent({
            ...data,
            onConfirm,
            onCancel: onCancel ?? (() => setIsVisible(false)),
        });
        setIsVisible(true);
    };

    const showInformativeModal: ModalContextType["showInformativeModal"] = (
        data,
        onConfirm,
        onCancel
    ) => {
        setModalType("info");
        setModalContent({
            ...data,
            onConfirm,
            onCancel,
        });
        setIsVisible(true);
    };

    const hideModal = () => setIsVisible(false);

    return (
        <ModalContext.Provider
            value={{ showOkModal, showYesNoModal, showInformativeModal, hideModal }}
        >
            {children}
            {isVisible && (
                <Modal
                    transparent
                    visible={isVisible}
                    animationType="fade"
                    onRequestClose={hideModal}
                    statusBarTranslucent
                >
                    <TouchableWithoutFeedback onPress={hideModal} accessible={false}>
                        <View style={styles.modalContainer}>
                            <BlurView
                                style={StyleSheet.absoluteFill}
                                blurType="dark"
                                blurRadius={2}
                            />
                            <TouchableWithoutFeedback>
                                <View style={styles.modalContent}>
                                    {modalContent.type !== "info" && (
                                        <View style={{ width: "100%", alignItems: "flex-end" }}>
                                            <Icon
                                                rounded
                                                source={images.cross}
                                                size={30}
                                                onPress={modalType === "ok" ? modalContent?.onCancel : hideModal}
                                                color={colors.primary}
                                                border={colors.medium_primary}
                                            />
                                        </View>
                                    )}
                                    {modalContent.type !== "info" && (
                                        <Image
                                            source={
                                                modalContent.type === "success"
                                                    ? images.modal_check
                                                    : modalContent.type === "warning"
                                                        ? images.warning
                                                        : images.modal_cross
                                            }
                                            style={{
                                                height: heightPixel(78),
                                                resizeMode: "contain",
                                                marginBottom: heightPixel(20),
                                            }}
                                        />
                                    )}
                                    <Text
                                        style={[
                                            styles.title,
                                            modalContent.type == "info" ? { width: "100%" } : {},
                                        ]}
                                        color={colors.pure_black}
                                        position="center"
                                        size={24}
                                        weight="bold"
                                        line_height={40}
                                    >
                                        {modalContent?.title}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.message,
                                            modalContent.type == "info" ? { width: "100%" } : {},
                                        ]}
                                        color={colors.black}
                                        position="center"
                                    >
                                        {modalContent?.message}
                                    </Text>

                                    {modalType === "ok" ? (
                                        <Button
                                            text="Ok"
                                            height={40}
                                            onPress={() => {
                                                modalContent.onConfirm?.();
                                                hideModal();
                                            }}
                                        />
                                    ) : modalType === "info" ? null : (
                                        <View style={styles.buttonContainer}>
                                            <Button
                                                height={40}
                                                text="Yes"
                                                style={{ width: "48%" }}
                                                onPress={() => {
                                                    modalContent.onConfirm?.();
                                                    hideModal();
                                                }}
                                            />
                                            <Button
                                                height={40}
                                                text="No"
                                                type="secondary"
                                                style={{ width: "48%" }}
                                                onPress={() => {
                                                    modalContent.onCancel?.();
                                                    hideModal();
                                                }}
                                            />
                                        </View>
                                    )}
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            )}
        </ModalContext.Provider>
    );
};

//
// ---------- Styles ----------
//

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "70%",
        padding: 20,
        paddingBottom: heightPixel(30),
        backgroundColor: colors.white,
        borderRadius: heightPixel(10),
        alignItems: "center",
    },
    title: {
        width: "80%",
        marginBottom: heightPixel(10),
    },
    message: {
        marginBottom: heightPixel(30),
        width: "80%",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
});
