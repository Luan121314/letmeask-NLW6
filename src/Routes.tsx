import Home from './pages/Home';
import NewRoom from './pages/NewRoom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Room from './pages/Room';

const Routes = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/rooms/new" component={NewRoom} />
                <Route path="/rooms/:id" component={Room} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
