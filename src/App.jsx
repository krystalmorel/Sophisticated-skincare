import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Info from './pages/Info'
import Scannig from './pages/Scannig'
import Demographics from './pages/Demographics'

const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/info' element={<Info />} />
        <Route path='/scanning' element={<Scannig />} />
        <Route path='/demographics' element={<Demographics />} />
      </Routes>

    </Router>
  )
}

export default App

