import './App.css';
import {DataProvider} from "./ContextData";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import RoomUpload from './RoomUpload';
import Login from './Login';
import SearchPage from './SearchPage';
import Home from './Home'
import Header from "./Header";
import Footer from "./Footer";
import Register from './Register'
import BookedRooms from './BookedRooms';
import EditBooking from './EditBooking';
import Pondy from './Pondy';
import Ooty from './Ooty';
import Chennai from './Chennai'
import ChennaiRoom from './Rooms/Chennai/chennaiRoom';
import RoomDetails from './Components/RoomDetails';
function App() {
  return (
    <div className="App">
      <Router>
      <DataProvider>
        <Header />
        <Switch>
        <Route path='/s/pondy' component={Pondy} exact={true}/>
        <Route path='/s/ooty' component={Ooty} exact={true}/>
        <Route path='/s/chennai' component={Chennai} exact={true}/>
        <Route path='/chennaiRoom' component={ChennaiRoom} exact={true}/>
        <Route path='/' component={Home} exact={true}/>
        <Route path='/rooms/:id' component={RoomDetails} exact={true}/>
        <Route path='/editbooking' component={EditBooking} exact={true}/>
        <Route path="/roomsbooked" component={BookedRooms} exact={true}/>
        <Route path='/host' component={RoomUpload} exact={true}/>
        <Route path='/search' component={SearchPage} exact={true}/>
        <Route path="/register" component={Register} exact={true}/>
          <Route path='/login' component={Login} exact={true}/>
        </Switch>
        </DataProvider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
