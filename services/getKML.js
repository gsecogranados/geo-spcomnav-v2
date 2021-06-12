export const getKML = (url) => {
  return fetch("./api/fileKML", 
  {
    method: 'POST',
    body: url
 }) //'20140604_A0.GE.kml' "20140409_A1_truth.kml"
  .then((res) => res.text())
  .then((kmlText) => {
    const parser = new DOMParser();
    const kml = parser.parseFromString(kmlText, "text/xml");
    console.log(kml)
    return kml 
  }); 
}
