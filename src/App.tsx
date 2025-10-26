import Signupform from './forms/Signupform'
import { BrowserRouter, Routes, Route } from 'react-router'
import MainLayout from './common/MainLayout'
import HomeForms from './forms/HomeForms'
import MiscForm from './forms/MiscForm'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomeForms />
          } />
          <Route path='forms/formik' element={<Signupform />} />
          <Route path='forms/useform' element={<MiscForm />} />

        </Route>

      </Routes>


    </BrowserRouter>
  )
}

export default App