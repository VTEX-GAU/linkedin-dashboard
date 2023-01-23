import { useState } from "react";
import { ComposableMap, Geographies, ZoomableGroup } from "react-simple-maps";
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json";

function Map({data, colorScale, width, height, Logic, setMapTooltip}) {
	const [position, setPosition] = useState({coordinates: [0,0], zoom: 1});

	function handleMovement(position){
		setPosition(position);
	}

	function handleZoomOut() {
		if(position.zoom <= 1) return;
		setPosition((pos) => ({...pos, zoom: pos.zoom/2}));
	}
	function handleZoomIn() {
		if(position.zoom >= 4) return;
		setPosition((pos) => ({...pos, zoom: pos.zoom*2}));
	}

  return (
		<>
    <ComposableMap projection="geoMercator" style={{ width, height, margin: "0 auto" }}>
      <ZoomableGroup
        zoom={position.zoom}
        center={position.coordinates}
        onMoveEnd={handleMovement}
      >
        <Geographies geography={geoUrl} fill="#e3e3e3">
          {({ geographies }) =>
            geographies.map((geo) => {
              return <Logic geo={geo} data={data} setMapTooltip={setMapTooltip} colorScale={colorScale} />
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
		<div className="controls" style={{bottom: height, justifyContent: 'center'}}>
			<button onClick={handleZoomIn}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="3"
				>
					<line x1="12" y1="5" x2="12" y2="19" />
					<line x1="5" y1="12" x2="19" y2="12" />
				</svg>
			</button>
			<button onClick={handleZoomOut}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="3"
				>
					<line x1="5" y1="12" x2="19" y2="12" />
				</svg>
			</button>
		</div>
		</>
  );
}

export default Map;