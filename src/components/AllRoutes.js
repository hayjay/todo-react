import React, {Component} from 'react';
import Home from './Home'

class AllRoutes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/" component={AppWrapper}></Route>
            </Switch>
        )
    }
}