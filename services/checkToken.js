export const checkToken = (token) => {
  return fetch("./api/getToken", 
  {
    method: 'POST',
    body: token
 }) 
  .then((res) => {
    if(res.status === 202){
      return true
    }else{
      return false
    }
  })
}
