let Client = require('ssh2-sftp-client');
let sftp = new Client();

//Initial Route
const scenarios = '/IGNSSRX/SCENARIOS/VIPER/TRUTH'

//Credentials to access the NAS via Protocol SFTP
const sftpConfig = {
  host: '158.109.73.27',
  port: '55028',
  username: 'sdiazserena',
  password: 'sDiaz.!2021'
}

export default async (req,res) =>{
  console.log(req.body)
  
  console.log(sftp.client.config.host)
  console.time('Connection Time');
  await  (sftp.client.config.host ? true : sftp.connect(sftpConfig))
  console.timeEnd('Connection Time')
  
  console.time('Extraction Time');
  sftp.get(req.body).then((data) => {  // /IGNSSRX/SCENARIOS/VIPER/TRUTH/Apr/20140604/A0/20140604_A0.GE.kml /IGNSSRX/SCENARIOS/VIPER/TRUTH/Apr/20140409/A1/20140409_A1_truth.kml
    res.setHeader('Content-Type', 'text/xml');
    res.send(data);
    console.timeEnd('Extraction Time')
  });
}

