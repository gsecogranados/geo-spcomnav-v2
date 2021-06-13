import React, { useState, useEffect} from 'react';

import TableSelector from '../components/tableSelector';

const PopUp = ({map,url, user, nameFile})=> {
 
  const [point1, setPoint1] = useState('');
  const [point2, setPoint2] = useState('');
  
  const clickPoint = (time)=>{
    setPoint1(time);
    //point2 ? alert('The Point 1 is Selected') : setPoint1(time);
  }
  const clickPoint2 = (time)=>{
    setPoint2(time)
    //point2 ? alert('The Point 1 is Selected') : setPoint1(time);
  }

  useEffect(() => {
    map.on('layeradd', ()=>{
      map.eachLayer(function(l){
        //console.log(l instanceof L.MarkerClusterGroup)
        if(l instanceof L.MarkerCluster == false){
          if( l instanceof L.Marker && map.getBounds().contains(l.getLatLng()) ){
            var popup = l.getPopup();
            //console.log(popup.getContent())
            if(popup.getContent().nodeName !='DIV'){
              if(popup.getContent().includes('Time')){
                //console.log(popup)
              
                var domelem = document.createElement('div');
                domelem.href = "#point_555_444";
                domelem.innerHTML = popup.getContent();
                domelem.className="text-center"
                var btn = document.createElement('button')
                btn.className = "btn m-1 btn-primary";
                btn.innerHTML = "Select Starting Point"
                btn.href = popup.getContent().substr(popup.getContent().search('Time')+47,8);
                //console.log(popup.getContent().search('Time'))
                //console.log(popup.getContent().substr(popup.getContent().search('Time')+47,8))
                btn.onclick = function() {
                    clickPoint(this.href);
                    //setPoint1(this.href)
    
                };
                var btn2 = document.createElement('button')
                btn2.className = "btn m-1 btn-primary";
                btn2.innerHTML = "Select End Point";
                btn2.href = popup.getContent().substr(popup.getContent().search('Time')+47,8);
                //console.log(popup.getContent().search('Time'))
                //console.log(popup.getContent().substr(popup.getContent().search('Time')+47,8))
                btn2.onclick = function() {
                    clickPoint2(this.href);
                    //setPoint1(this.href)
    
                };

                domelem.appendChild(btn)
                domelem.appendChild(btn2)
                //l.bindPopup(`<div>${ReactDOMServer.renderToString(<TooltipFeatureDetails setPoint1={setPoint1}/>)}</div>`)
  
                l.bindPopup(domelem, { className: 'kml-popup'})
                //l.bindPopup(ReactDOMServer.renderToString(<CustomReactPopup></CustomReactPopup>), { className: 'kml-popup'})
            
                }
            } 
          }
        }
      })
    })
   
  }, []);

  return (
    <TableSelector nameFile={nameFile} user={user} setPoint1={setPoint1} setPoint2={setPoint2} point1={point1} point2={point2} url={url}/>
    
  )
}

export default PopUp
