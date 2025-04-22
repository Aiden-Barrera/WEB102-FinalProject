import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Navbar from './pages/Navbar'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/createPost' element={<CreatePost />}/>
      </Routes>
    </>
  )
}

export default App
