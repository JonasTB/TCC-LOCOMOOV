import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login/Login.jsx';
import UsersList from '../src/components/pages/UserDashboard/Users.jsx';
import CreateUser from '../src/components/pages/CreateUser/CreateUser.jsx';
import ScootersList from '../src/components/pages/ScooterDashboard/Scooters.jsx';
import CreateScooters from '../src/components/pages/CreateScooter/CreateScooter.jsx';
import UsersSuperList from '../src/components/pages/UserDashboard/SuperAdmins.jsx';
import UsersAdminList from '../src/components/pages/UserDashboard/Admins.jsx';
import ForgotPassword from './components/pages/ForgotPassword/ForgotPassword.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>

        <Route exact path="/users_super" element={<UsersSuperList />}></Route>

        <Route exact path="/users_admin" element={<UsersAdminList />}></Route>

        <Route exact path="/users" element={<UsersList />}></Route>

        <Route exact path="/createUsers" element={<CreateUser />}></Route>

        <Route exact path="/scooters" element={<ScootersList />}></Route>

        <Route
          exact
          path="/forgot_password"
          element={<ForgotPassword />}
        ></Route>

        <Route
          exact
          path="/createScooters"
          element={<CreateScooters />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
