// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {addToken, getToken} from '../../firebase/client'

export default async(req, res) => {
  //console.log(makeid(4))
  //
  await getToken().then((e)=>{
    if (e[0].token === req.body){
      addToken(makeid(4))
      res.status(202).json({ name: 'John Doe' })
    }
    else {
      console.log("404")
      res.status(401).json({ name: 'John Doe' })
    }
  })
 

}

const makeid = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
 return result;
}