import React from 'react'
import L from 'leaflet'
import { MapContainer, LayersControl, TileLayer, Marker, MapConsumer } from 'react-leaflet'

interface IMapWithMarker {
  position: { lat: number; lng: number }
}

const iconPerson = new L.Icon({
  iconUrl: '/assets/img/marker.svg',
  iconRetinaUrl: '/assets/img/marker.svg',
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(51, 74),
})

const MapWithMarker: React.FC<IMapWithMarker> = ({ position }) => {
  return (
    <MapContainer center={position} zoom={14} scrollWheelZoom={false} style={{ height: '350px' }}>
      <MapConsumer>
        {map => {
          map.setView(position)
          return null
        }}
      </MapConsumer>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Street">
          <TileLayer url="http://1.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?app_id=OO3n6HayrdDH6DhkxRgG&app_code=MZQ6Zn6zc1s5Psz92GMMxw" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satellite">
          <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
        </LayersControl.BaseLayer>
        <Marker position={position} icon={iconPerson}></Marker>
      </LayersControl>
    </MapContainer>
  )
}

export default MapWithMarker
