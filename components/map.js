/** @jsxImportSource theme-ui */
import React, {useEffect, useState, useRef} from 'react';
import Card from 'react-bootstrap/Card'
import { jsx, Box, Heading} from 'theme-ui';
import { Map, TileLayer, Marker, Popup} from "react-leaflet";

import ReactLeafletKml from 'react-leaflet-kml';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import { onAuthStateChanged } from '../firebase/client';
import {getKML} from '../services/getKML';

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import 'react-leaflet-markercluster/dist/styles.min.css';


import SelectListKML from '../components/selectListKML'
import PopUp from '../components/popup';


const MapD = () => {
  const [user, setUser] = useState(undefined);
  const [nameFile, setNameFile] = useState('20140424_A1.GE.kml');
  const [kml, setKml] = useState(null);
  const [url, setUrl] = useState("/IGNSSRX/SCENARIOS/VIPER/TRUTH/Apr/20140424/A1/20140424_A1.GE.kml");

  const [map, setMap] = useState(null);
  const mapRef = useRef();

  useEffect(async ()=>{
    await onAuthStateChanged(setUser)
    getKML(url).then((kml)=>{
      setKml(kml)
    })  
    if (!mapRef.current) return;
    setMap(mapRef.current.leafletElement);
       
  }, [url]);

  return (
    
    <Box id="home" as="section" variant="section.banner" sx={styles.banner}>
      <Box sx={styles.boxTitle}>
        <Heading sx={styles.title}>
          Welcome to SCPOMNAV!
        </Heading>
      </Box>

      <div className="row m-3">
        <SelectListKML user={user} setNameFile={setNameFile} setUrl={setUrl} setKml={setKml} kml={kml}/>
        <div className="col-sm-8 col-sm-offset-4 col-md-10 col-md-offset-3"> 
          
          <Card>
          {!kml && 
              <div className="spinner"/>
          }  
          <Map ref={mapRef} minZoom={5} animate={false} updateWhenZooming={false} center={[51.505, -0.09]} zoom={7} style={{height: "60vh"}}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {kml && <MarkerClusterGroup disableClusteringAtZoom={18} maxClusterRadius={60} chunkedLoading={true}>
              <ReactLeafletKml kml={kml} />
            </MarkerClusterGroup>}  
        </Map>
        </Card>
        </div>
      </div>  
      {map && <PopUp map={map} url={url} user={user} nameFile={nameFile}/> }
    </Box>
  )

}

export default MapD

const styles = {
  banner: {
    paddingBottom: 5,    
  },
  boxTitle: {
    display: ['grid'],
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    minHeight: ['30vh'],
    pt:[100]
  },
  title: {
    fontWeight: 'bold',
    fontSize: ['60px'],
    lineHeight: 1.33,
    letterSpacing: '-1px',
    color: 'textSecondary',
  },

}