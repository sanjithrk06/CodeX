import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { CompilerProvider } from "./context/Compiler";

// Pages import
import Home from './pages/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />} />
  )
)

function App() {

  return (
    <CompilerProvider>
      <RouterProvider router={router} />
    </CompilerProvider>
  )
}

export default App
