import Home from './pages/Home';
import NewRoom from './pages/NewRoom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Room from './pages/Room';
import AdminRoom from './pages/AdminRoom';

const Routes = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/rooms/new" component={NewRoom} />
                <Route path="/rooms/:id" component={Room} />
                <Route path="/admin/rooms/:id" component={AdminRoom} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
