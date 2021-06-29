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
  try {
    console.log('Connecting...');
    console.time('Connection Time');
    await sftp.connect(sftpConfig).then(async() => {
        console.timeEnd('Connection Time');
        console.log('Connected');
        res.status(200).json({ name: 'John Doe' })

    });
  } catch (e) {
    console.error(e.message); 
    res.status(500).json({ name: 'John Doe' })
  } finally {
    console.log('Closing session...');
    await sftp.end();
    console.log('Session closed.');
  }
}