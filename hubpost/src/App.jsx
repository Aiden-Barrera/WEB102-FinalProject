import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Navbar from './pages/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<div>Home Page</div>}/>
        <Route path='/createPost' element={<div>Post Page</div>}/>
      </Routes>
    </>
  )
}

export default App
