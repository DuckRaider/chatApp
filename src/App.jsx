import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './Home'
import { Login } from './Login'
import { Register } from './Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
       <Route path='/' index element={<Home/>}/>
       <Route path='/*' element={<Home/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
