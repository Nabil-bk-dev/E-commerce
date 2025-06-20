import { BrowserRouter, Route ,Routes } from "react-router-dom"
import HomePage from "./pages/homePage"
import LoginPage from "./pages/LoginPage"
import NavBar from "./components/NavBar"


function App() {


  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
