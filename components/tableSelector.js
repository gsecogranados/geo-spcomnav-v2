import React, { useState, useEffect} from 'react';
import Spinner from 'react-bootstrap/Spinner'
import TrashIcon from '../assets/trash.svg'

const Table = ({nameFile, point1, point2, setPoint1, setPoint2, user}) => {

  const [downloadFile, setDownloadFile] = React.useState(false);
  const [typeSPS, setTypeSPS] = React.useState('GPS')

  useEffect(() => {
    
  }, []);
  
  const clickButtonDownload = ()=>{
    setDownloadFile(true);
    
  }

  return (
    <>  
      <div className="table-responsive">
        <div className="table-wrapper d-flex justify-content-center">  
          <table className="table table-striped w-50" >
            <thead>
              <tr>
                <th>File Name</th>
                <th className="text-center">Point 1</th>
                <th className="text-center">Point 2</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td > <div className="card-body text-center mt-2 font-weight-bold" >{nameFile}</div></td>
                <td >
                   <div className="card-body d-flex  align-items-center text-center">
                    <p className="text-center mx-auto my-auto ">{point1}</p>
                    <button type="button" className=" mx-start justify-content-end btn btn-outline-secondary" onClick={()=>{setPoint1(null)}}>
                      <img src={TrashIcon}/>
                    </button> 
                    
                  </div>
                </td>
                <td  >
                 <div className="card-body d-flex justify-content-between align-items-center">
                  <p className="text-center  mx-auto my-auto ">{point2}</p> 
                  <button type="button" className="mx-start justify-content-end btn btn-outline-secondary" onClick={()=>{setPoint2(null)}}>
                    <img src={TrashIcon} style={{color:'white'}}/>
                  </button>
                  </div> </td>
                  <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


      <div className="col text-center">
        <div className="pb-3">
          <p  className="title-select font-weight-bold mb-1">Type of Satellite Positioning System</p>
            <select className="input-small" id="eFormControlSelect1" onChange={(e)=>{setTypeSPS(e.target.value)}}>  
              <option key='1' value='GPS'>GPS</option>
              <option key='2' value='GLO'>GLONASS</option>
            </select>
        </div>

        <button type='button' onClick={clickButtonDownload} className='btn btn-primary mb-5'  disabled={user ? false : true}>
          {downloadFile==true && <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />  }
          
          {downloadFile==true ? ' Downloading...' : 'Download Sample'}
        </button>
      </div>
      
    </>
  )
}

export default Table
