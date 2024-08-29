import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import { CompilerProvider } from "./context/Compiler";

// Pages import
import MainLayout from "./layouts/mainLayout";
import { Compiler } from "./components";

const langLoader = ({ params }) => {
  const { lang } = params;
  const validLanguages = ['c', 'java'];

  if (!validLanguages.includes(lang)) {
    return redirect('/c');
  }
  
  return null;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<MainLayout />}>
      <Route path="/:lang" element={<Compiler />} loader={langLoader} />
      <Route path="/" element={<Navigate to='/c' replace={true} />} />
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
