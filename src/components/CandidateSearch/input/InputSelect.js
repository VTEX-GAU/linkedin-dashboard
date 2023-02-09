import { InputSelectStyle } from "./style";

const InputSelect = ({children, ...props}) => {
    return <InputSelectStyle {...props}>{children}</InputSelectStyle>
}

export default InputSelect;