import {Login} from "./screens/login";
import { BrowserRouter , Route, Switch } from 'react-router-dom';
import {Building} from "./screens/buildings";
import NavigationBar from "./Navigation";
import {Apartment} from "./screens/apartments";
import {Room} from "./screens/rooms";
import {User} from "./screens/users";
import {Device} from "./screens/Device";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Switch>
                  <Route exact path="/" component={Login} />
                  <div>
                      <NavigationBar/>
                      <Route exact path="/buildings" component={Building}/>
                      <Route path="/buildings/:idBuilding" component={Apartment} exact/>
                      <Route path="/buildings/:idBuilding/:idApartment/room" component={Room} exact/>
                      <Route path="/buildings/:idBuilding/:idApartment/user" component={User} exact/>
                      <Route path="/buildings/:idBuilding/:idApartment/:idRoom/device" component={Device} exact/>
                  </div>
              </Switch>
          </BrowserRouter>
      </div>
  );
}

export default App;
