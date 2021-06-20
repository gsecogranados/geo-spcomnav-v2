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

const getKML = async(path, res) => {
  await sftp.get(path).then((data) => {  // /IGNSSRX/SCENARIOS/VIPER/TRUTH/Apr/20140604/A0/20140604_A0.GE.kml /IGNSSRX/SCENARIOS/VIPER/TRUTH/Apr/20140409/A1/20140409_A1_truth.kml
    res.setHeader('Content-Type', 'text/xml');
    res.send(data);
  }).catch((e)=>{console.log(e)});
}
export default async (req,res) =>{
  try {
    console.log('Connecting...');
    console.time('Connection Time');
    await sftp.connect(sftpConfig).then(async() => {
        console.timeEnd('Connection Time');
        console.log('Connected');
        console.time('Extraction Time')
        await getKML(req.body, res);
        console.timeEnd('Extraction Time')
    });
  } catch (e) {
    console.error(e.message); 
  } finally {
    console.log('Closing session...');
    await sftp.end();
    console.log('Session closed.');
  }
}

