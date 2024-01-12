import { Router as BrowserRouter, Route, Routes } from 'react-router-dom'
import {ChakraProvider} from '@chakra-ui/react'

//pages
import Home from './pages/Home'

function App() {
  return (
    <ChakraProvider>
        <div className='App'>
            <Home />
        </div>
    </ChakraProvider>
  )
}

export default App
