import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './All_pages/RegisterPage.jsx';
import SignIn from './All_pages/LoginPage.jsx';
import Inbox from './All_pages/Inbox.jsx';
import { ToastContainer } from 'react-toastify';
import Forget from './All_pages/ForgetPage.jsx';
import { Reset } from './All_pages/ResetPage.jsx';
import IndividualMail from './All_pages/IndividualMail.jsx';
import DraftPage from './All_pages/DraftPage.jsx';
import SendPage from './All_pages/SendPage.jsx';
import Important from './All_pages/ImportantPage.jsx';
import StarredPage from './All_pages/StarredPage.jsx';
import ErrorPage from './All_pages/ErrorPage.jsx';
import Trash from './All_pages/TrashPage.jsx';
import { useSelector } from 'react-redux';

function App() {
  const token = useSelector((state) => state.email.user.token);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/register' Component={SignUp} />
          <Route exact path='/' element={<SignIn />} />
          <Route path='/inbox' element={<Inbox />}> </Route>
          <Route path='/:type/:msgId' element={<IndividualMail />}> </Route>
          <Route path='/outbox' element={<SendPage />} />
          {/* <Route path='/forget' Component={<Forget/>} /> */}
          <Route path="/forget" element={<Forget />} />
          <Route path='/reset/:token' Component={Reset} />
          <Route path='/drafts' Component={DraftPage} />
          <Route path='/starred' Component={StarredPage} />
          <Route path='/important' Component={Important} />
          <Route path='/trash' Component={Trash} />
          <Route path='*' Component={ErrorPage} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}
export default App
