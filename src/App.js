import React,{useEffect, useState, useContext} from 'react';
import Chat from './Chat';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./App.css"
import Login from './Login';
import { StateContext } from './StateProvider';


function App() {
  const [user, setUser] = useContext(StateContext)
  const [messages, setMessages] = useState([])

  return (
    <div className="app">
      {!user.user? (
        <Login/>
      ) :(
        <div className="app__body">
          <Router>
            <Sidebar />
              <Switch>
                <Route path="/rooms/:roomId">
                  <Chat/>
                </Route>
                <Route path="/"></Route>
              </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
