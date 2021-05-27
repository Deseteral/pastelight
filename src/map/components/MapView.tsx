import * as React from 'react';
import mapboxgl from 'mapbox-gl';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGVzZXRlcmFsIiwiYSI6ImNrYmptOXJxbzBxcDYyeGw5ajN6bTM2cGMifQ.9Ysglm7PTSGLug9z5grXkQ';

interface MapViewProps { }

function MapView(): JSX.Element {
  const map = React.useRef<mapboxgl.Map | null>(null);

  React.useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    map.current = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9,
    });
  }, []);

  return (
    <div
      id="map"
      style={({ top: 0, bottom: 0, position: 'absolute', width: '100%' })}
    />
  );
}

export default MapView;
export { MapViewProps };
