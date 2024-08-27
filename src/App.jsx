import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { CompilerProvider } from "./context/Compiler";

// Pages import
import Home from './pages/Home';
import MainLayout from "./layouts/mainLayout";
import { Compiler } from "./components";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<Compiler />} />
    </Route>
    </>
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
