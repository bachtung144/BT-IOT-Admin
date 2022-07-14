import {Login} from "./screens/login";
import { BrowserRouter , Route, Switch } from 'react-router-dom';
import {Building} from "./screens/buildings";
import NavigationBar from "./Navigation";
import {Apartment} from "./screens/apartments";
import {Room} from "./screens/rooms";
import {User} from "./screens/users";
import {Device} from "./screens/devices";
import {Chip} from "./screens/chips";
import {ChangePass} from "./screens/changePass";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Switch>
                  <Route exact path="/" component={Login} />
                  <div>
                      <NavigationBar/>
                      <Route exact path="/buildings" component={Building}/>
                      <Route exact path="/chips" component={Chip}/>
                      <Route exact path="/change-password" component={ChangePass} />
                      <Route exact path="/buildings/:buildingId" component={Apartment} />
                      <Route exact path="/buildings/:buildingId/:apartmentId/room" component={Room} />
                      <Route exact path="/buildings/:buildingId/:apartmentId/user" component={User} />
                      <Route exact path="/buildings/:buildingId/:apartmentId/:roomId/device" component={Device} />
                  </div>
              </Switch>
          </BrowserRouter>
      </div>
  );
}

export default App;
