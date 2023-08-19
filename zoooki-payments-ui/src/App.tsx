import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar'
import Home from './views/Home'
import About from './views/About'
import Contacts from './views/Contacts'
import Success from './views/Success'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient

function App() {

  return (
    <>
    <HelmetProvider>
      <Router>
        <QueryClientProvider client={queryClient}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Navigate to="/campaign" />} />
            <Route path="/campaign" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />

            <Route path="/success" element={<Success />} />
            <Route path="*" element={<Navigate to="/" />} />
            {/* <Route path="*" element={<PageNotFound />} /> */}
          </Routes>
        </QueryClientProvider>
      </Router>
    </HelmetProvider>
    </>
  )
}

export default App
