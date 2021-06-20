let Client = require('ssh2-sftp-client');
let sftp = new Client();

//Initial Route
const scenarios = '/IGNSSRX/SCENARIOS/VIPER/TRUTH'

//Excluded folders within Synology NAS
const pathExclude = ['Pedestrian','decoded','log','raw']

//Credentials to access the NAS via Protocol SFTP
const sftpConfig = {
  host: '158.109.73.27',
  port: '55028',
  username: 'sdiazserena',
  password: 'sDiaz.!2021'
}

const filesKML = []
const arrayPath=[]

async function Read(directory) {
  console.log('Read(' + directory + ')');
  const result = await sftp.list(directory);
  for(const sub of result) {
    if (sub['type'] === 'd' && !pathExclude.includes(sub.name)){
      arrayPath.push(sub.name);
      await Read(directory + '/' + sub['name']);
      arrayPath.pop()
    }else{
      if(sub.name.includes('kml')){
        filesKML.push({name: sub.name, month:arrayPath[0],day:arrayPath[1],intent:arrayPath[2],path:directory+'/'+sub.name, size:sub.size})
      }     
    }
  }
}

async function main(directory) {
  try {
      console.log('Connecting...');
      await sftp.connect(sftpConfig).then(async() => {
          console.log('Connected');
          await Read(directory);
      });
  } catch (e) {
      console.error(e.message);
  } finally {
      console.log('Closing session...');
      await sftp.end();
      console.log('Session closed.');
  }
}
//START 
console.log('Application started');
main(scenarios).then(r => {
  console.log('Application ended.');
  console.log(filesKML)
  console.log(filesKML.sort( 
    function(a, b) {
       return parseFloat(a.size) - parseFloat(b.size);
    }
    )[0])
});
