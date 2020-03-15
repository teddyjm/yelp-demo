import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';
import './App.css';
import { Home } from './components/layouts/Home';
import SearchBar, {  } from './components/common/SearchBar';
import { Paper } from '@material-ui/core';
import { Places } from './components/layouts/Places';
import { Place } from './components/layouts/Place';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <CssBaseline />
                <SearchBar />
                <Paper style={{ margin: '20px', padding: '20px' }}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/places/:where/:what?" component={Places} />
                        <Route path="/place/:id" component={Place}/>
                    </Switch>
                </Paper>
            </div>
        </BrowserRouter>
    );
}

export default App;
