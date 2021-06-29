import {loginWithEmail} from './firebase/client'
import {signInWithEmail} from './firebase/client'
import {getUser} from './firebase/client'
import {hello} from './pages/api/hello'
const fetch = require("node-fetch");

const user= 'usertest@gmail.com'
const pass= '12345678'

describe('Register Firebase', ()=>{
  test('Función Registro Usuario '+user, async ()=>{
    await loginWithEmail(user,pass)
    const data =await getUser().email;
    console.log(data)
    expect(data).toBe(user)
  })
})


describe('Login Firebase', ()=>{
  test('Función Login '+user, async ()=>{
    const data = await signInWithEmail(user, pass)
    expect(data.user.email).toBe(user)
  })
  test('Función Extraer usuario registrado'+user, async ()=>{
    const data = getUser().email
    expect(data).toBe(user)
  })
})


describe('NAS Synlogoy', ()=>{
  test('Función Acceso NAS', async ()=>{
  fetch("./api/hello")
  .then((res) => expect('200').toBe(res.status))
  })
})


