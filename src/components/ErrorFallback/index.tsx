import { memo } from "react"
import Text from "../Text"
import Wrapper from "../Wrapper"

const ErrorFallback = () => {
    return (
        <Wrapper>
            <Text>Something Went Wrong!</Text>
        </Wrapper>
    )
}

export default memo(ErrorFallback)