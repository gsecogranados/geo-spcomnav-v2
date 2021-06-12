/** @jsxImportSource theme-ui */
import React, {useEffect} from 'react';
import Card from 'react-bootstrap/Card'
import { jsx, Box, Heading} from 'theme-ui';
import { Map, TileLayer, Marker, Popup} from "react-leaflet";

import 'leaflet/dist/leaflet.css'

import SelectListKML from '../components/selectListKML'
import Table from '../components/tableSelector'

const MapD = () => {
  return (
    
    <Box id="home" as="section" variant="section.banner" sx={styles.banner}>
      <Box sx={styles.boxTitle}>
        <Heading sx={styles.title}>
          Welcome to SCPOMNAV!
        </Heading>
      </Box>

      <div className="row m-3">
        <SelectListKML/>
        <div className="col-sm-8 col-sm-offset-4 col-md-10 col-md-offset-3">  
          <Card>
          <Map minZoom={5} animate={false} updateWhenZooming={false} center={[51.505, -0.09]} zoom={7} style={{height: "60vh"}}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </Map>
        </Card>
        </div>
      </div>  
      <Table/>   
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