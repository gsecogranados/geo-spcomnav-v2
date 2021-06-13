import moment from 'moment'; 
import {addDB} from '../firebase/client'
const path = '/IGNSSRX/GNSS_SAMPLES/Vehicular Data Store/2014'
//Format URL: /IGNSSRX/SCENARIOS/VIPER/TRUTH/Apr/20140604/A0/20140604_A0.GE.kml
const getPathSample = (url, point1, point2, typeSPS) =>{
  var urlArray = url.split('/')
  //Get Month 
  var month = urlArray[5].toLowerCase() 
  console.log(path+'/'+month)

  //Get Day
  var day = Number(urlArray[6].slice(-2))
  console.log(path+'/'+month+'/'+day)

  //Stereo o Triton
  var typeRFfe= 'STEREO'
  console.log(path+'/'+month+'/'+day+'/'+typeRFfe)
  //Get GPS o GLN 
  var typeGNSS = typeSPS

  //Get Intent AX
  var intent =urlArray[7]
  console.log(intent)
  
  return {path: path+'/'+month+'/'+day+'/'+typeRFfe, file: typeRFfe+'_'+typeGNSS+'_'+day+(month.charAt(0).toUpperCase() + month.slice(1)), intent: intent, point1: point1, point2: point2, typeGNSS: typeSPS}
}

const fileSizeContinue = (seconds, typeSPS) => {
  var fm;
  typeSPS=== 'GPS' ? fm=10.28e6 : fm=21.576e6 //GLO
  var mbytes= ((seconds*fm)/Math.pow(1024,2)).toFixed(2)
  if (confirm('The file you are trying to download has a size of ' + mbytes + ' MBytes. Do you wish to continue?')){
    return true
  }else{
    return false
  }
}

export const getSamples = (url, point1, point2, typeSPS) => {

  var a = moment(point1, 'hh:mm:ss')
  var b = moment(point2, 'hh:mm:ss')
  var seconds = b.diff(a)/1000
  var path = getPathSample(url, point1, point2, typeSPS)
  console.log(path)
  
  var wishContinue = fileSizeContinue(seconds, typeSPS)
  if(wishContinue){
     return fetch("./api/downloadFileSample",  {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(path)
  }).then((res) => res.ok ? res.blob():alert('Sample not aviable')).then((data)=>{
      if(typeof data !== 'undefined'){
        console.log(data)
        const fileName = url.split("/", -1)
        //Force Download
        var urlD = window.URL.createObjectURL(data);
        var a = document.createElement('a');
        a.href = urlD;
        a.download = point1 + 'to' + point2 + '-'+ path.file+'.'+path.intent;
        document.body.appendChild(a); 
        a.click();    
        a.remove();  
        
        addDB(fileName[fileName.length-1], point1,point2, typeSPS)
      }
    });

  }else{
    return Promise.reject();
  }

  
  /*console.log(seconds)
  var path = getPathSample(url, point1, point2, typeSPS)
  console.log(path)
  var wishContinue = fileSizeContinue(seconds, typeSPS)
  if(wishContinue){
    return fetch("./api/fileSamples",  {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(path)
  }).then((res) => res.ok ? res.blob():alert('Sample not aviable')).then((data)=>{
      if(typeof data !== 'undefined'){
        console.log(data)
        //Force Download
        var urlD = window.URL.createObjectURL(data);
        var a = document.createElement('a');
        a.href = urlD;
        a.download = "filename.A0";
        document.body.appendChild(a); 
        a.click();    
        a.remove();  
        const fileName = url.split("/", -1)
        addDB(fileName[fileName.length-1], point1,point2, typeSPS)
      }
    });
  }else{
    return Promise.reject();
  }*/
}
