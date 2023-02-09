import {FilterButtonStyle} from './style'

const FilterButton = ({children, ...props}) => {
    return <FilterButtonStyle {...props}>{children}</FilterButtonStyle>
}

export default FilterButton;