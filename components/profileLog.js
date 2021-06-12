/** @jsxImportSource theme-ui */
import React, { useState, useEffect} from 'react';
import { onAuthStateChanged, getFiles } from '../firebase/client';
import { useRouter } from 'next/router'
import Card from 'react-bootstrap/Card'
import { jsx, Box, Heading} from 'theme-ui';

const ProfileLog = () => {
  const router=useRouter();
  const [user, setUser] = useState(undefined);
  const [table, setTable] = useState(undefined)

  useEffect(async ()=>{
    await onAuthStateChanged(setUser)
    getFiles().then((e)=>{setTable(e); console.log(e)})
    
  }, []);
  return (
    <Box id="home" as="section" variant="section.banner" sx={styles.container}>
      <Box sx={styles.boxTitle}>
        <Heading sx={styles.title}>
          Log of Download Files
        </Heading>
      </Box>
    {user && user.avatar && 
      <div className="card shadow-lg p-3 m-5 mt-5 bg-white rounded text-center">
        <div className="d-flex justify-content-center">
          <img src={user.avatar} alt="Avatar" sx={styles.avatar} className="avatar rounded-circle"/>        
        </div> 
        <div className="mt-2">
          <h2>{user.username}</h2>
          
        </div>
        { table && table.length!==0 ? 
        <div className="mt-2">
          <div className="table-responsive">
            <div className="table-wrapper d-flex justify-content-center">  
              <table className="table table-striped mx-5" >
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th className="text-center">Point 1</th>
                    <th className="text-center">Point 2</th>
                    <th className="text-center">GNSS Type</th>
                    <th className="text-center">Download Date</th>  
                  </tr>
                </thead>
                <tbody>
                  {table.map((i)=>{
                    return (
                      <tr key={i.fileKML}>
                        <td> <div className="card-body text-center mt-2 font-weight-bold">{i.fileKML}</div></td>
                        <td>
                          <div className="card-body d-flex  align-items-center text-center">
                            <p className="text-center mx-auto my-auto ">{i.point1} </p>                    
                          </div>
                        </td>
                        <td>
                          <div className="card-body d-flex justify-content-between align-items-center">
                            <p className="text-center  mx-auto my-auto ">{i.point2}</p> 
                          </div>
                        </td>
                        <td>
                          <div className="card-body d-flex justify-content-between align-items-center">
                            <p className="text-center  mx-auto my-auto ">{i.typeGNSS}</p> 
                          </div>
                        </td>
                        <td>
                          <div className="card-body d-flex justify-content-between align-items-center">
                            <p className="text-center  mx-auto my-auto ">{i.date}</p> 
                          </div>
                        </td>
                      </tr>
                    ) 
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        :<span>Nothing</span>}
      </div>
     }
    </Box>
  )
}
export default ProfileLog;

const styles = {
  container: {
    marginTop: 5, 
    marginBottom: 10   
  },
  avatar: {
    marginRight: 2,
    width: '120px',
    height: '120px',
    marginTop: '-5rem!important'

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
    fontSize: ['50px'],
    lineHeight: 1.33,
    letterSpacing: '-1px',
    color: 'textSecondary',
  }
}