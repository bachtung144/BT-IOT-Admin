import {Login} from "./screens/login";
import { BrowserRouter , Route, Switch } from 'react-router-dom';
import {Building} from "./screens/buildings";
import NavigationBar from "./Navigation";
import {Test} from "./screens/test";
import {Apartment} from "./screens/apartments";
import {Room} from "./screens/rooms";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Switch>
                  <Route exact path="/" component={Login} />
                  <div>
                      <NavigationBar/>
                      <Route exact path="/buildings" component={Building}/>
                      <Route path="/test" component={Test}/>
                      <Route path="/buildings/:idApartment" component={Apartment}/>
                      {/*<Route path="/buildings/apartments/rooms" component={Room}/>*/}
                  </div>
              </Switch>
          </BrowserRouter>
      </div>
  );
}

export default App;
