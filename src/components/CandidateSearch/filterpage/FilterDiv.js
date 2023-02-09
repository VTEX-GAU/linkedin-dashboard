import { FilterDivStyle } from "./style";

const FilterDiv = ({children, ...props}) => {
    return <FilterDivStyle {...props}>{children}</FilterDivStyle>
}

export default FilterDiv;