const { Client } = require('ssh2');
const fs = require('fs');

//
let Client2 = require('ssh2-sftp-client');
let sftpList = new Client2();

//Credentials to access the NAS via Protocol SFTP
const sftpConfig = {
  host: '158.109.73.27',
  port: '55028',
  username: 'sdiazserena',
  password: 'sDiaz.!2021'
}

const getList = async (body) =>{
  try {
    return await sftpList.connect(sftpConfig).then(async ()=>{
      const result = await sftpList.list(body.path);
      var arrayFiles=[]
      result.map((i)=>{
        if(i.name.includes(body.file) && i.name.includes(body.intent)){
         if(body.point1.split(':')[0]===i.name.split('.')[1]){
          var hh= i.name.split('.')[1]
          var mm = i.name.split('.')[2] 
          arrayFiles.push({file:i.name, hh:hh, mm:mm, mmIni: body.point1.split(':')[1], mmFi: body.point2.split(':')[1], ssIni:body.point1.split(':')[2], ssFi:body.point2.split(':')[2]  })
         }
        }
      })
      return arrayFiles
    })
  } catch (e) {
    console.error(e.message); 
  } finally {
    console.log('Closing session...');
    await sftpList.end();
    console.log('Session closed.');
  }
 
}

const selectFile = (posiblesFiles, body)=>{
  const file = []
  posiblesFiles.map((i)=>{
    if(Number(i.mm)<=Number(body.point1.split(':')[1])){
      if(Number(body.point1.split(':')[1])-Number(i.mm)<10){
        file.push(i);
      }
    }
  })
  return file 
}

const selectInterval = (file, typeGNSS)=>{
  var fm;
  typeGNSS=== 'GPS' ? fm=10.28e6 : fm=21.576e6 //GLO
  //Si los minutos seleccionados son iguales
  if(file.mmIni === file.mmFi){
    var dif = Number(file.ssFi)- Number(file.ssIni)
    console.log(dif)
    //Punto de inicio y final del fichero. 1 seg equivale a 10.28e6 bytes
    var start = (Number(file.mmIni) - Number(file.mm))*60 + Number(file.ssIni)
    start = (start*fm)
    var end = (start+dif*fm)-1
    return {startByte: start, endByte: end}
  }
}


export default async (req,res) =>{
  const conn = new Client();
  conn.on('ready', () => {
    console.log('Client :: ready');
    conn.sftp(async (err, sftp) => {
      console.log(req.body)
      const posiblesFiles = await getList(req.body)
      console.log(posiblesFiles)
      const file = await selectFile(posiblesFiles, req.body)[0]
      console.log(file)
      if(typeof file === 'undefined'){
        res.status(404).json({name:'Sample not available'})
      }else{
        const fetchData=[]
        const {startByte, endByte} = await selectInterval(file, req.body.typeGNSS);
        console.log(startByte)
        console.log(endByte)
        console.log(req.body.path+'/'+file.file)
        var rstream = await sftp.createReadStream(req.body.path+'/'+file.file, { start: startByte, end: endByte});
        rstream.on("error", err => reject(err));
        rstream.on('data', (row) => {
          fetchData.push(row);
        })
        rstream.on("end", () => res.send(Buffer.concat(fetchData)));
      }
    });
  }).connect(sftpConfig);
}