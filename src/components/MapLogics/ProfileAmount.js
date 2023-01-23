import { Geography } from "react-simple-maps";

function ProfileAmount({geo, data: countries, setMapTooltip, colorScale}) {
    const country = countries.current[geo.properties["Alpha-2"]?.toLowerCase()];

    return (
        <Geography
            key={geo.rsmKey}
            geography={geo}
            onMouseEnter={() => {
                setMapTooltip(
                `${geo.properties.name}: ${country || 0} profiles`
                );
            }}
            onMouseLeave={() => {
                setMapTooltip("");
            }}
            fill={colorScale(country)}
            stroke="#000000"
            style={{
                default: {
                outline: "none",
                },
                hover: {
                outline: "none",
                },
                pressed: {
                outline: "none",
                },
            }}
        />
    );
}

export default ProfileAmount;