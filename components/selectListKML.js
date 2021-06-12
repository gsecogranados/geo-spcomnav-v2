import React from 'react';
import { Select, Box } from 'theme-ui'

import {listFilesKML} from './listFilesKml'

const SelectListKML = () => {
  return (
    <>
      <div className="selectList col-sm-4 col-md-2 pt-3">    
        <h5  className="title-select">Files KML</h5>
        <Select className="form-control" id="eFormControlSelect1" >  
          {listFilesKML.map((i)=>{
            return (
              <optgroup key={i.month} label={i.month}>
              {i.days.map((i)=>{
                return <option key={i.name} value={i.path}>{i.name}</option>
              })}
              </optgroup>
            )
          })}
        </Select>
      </div>
    </>
  )
}

export default SelectListKML
