import React, { useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import { AuthContext } from "./context/auth";
import authReducer, {initialState} from "./reducers/auth";

import {setTokens} from "./utils/authUtils"

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//CRUD
import Create from './pages/product/create';
import Edit from './pages/product/edit';
import Index from './pages/product/index';

function App() {
    const [state, dispatch] = React.useReducer(authReducer, initialState);

    const handleAuthentication = (data = null) => {
        setTokens(data, dispatch)
    };

    const contextValue = useMemo(() => {
        return { state, dispatch, handleAuthentication};
    }, [state, dispatch]);

    return(
        <AuthContext.Provider value={contextValue}>
            <Router>
                <div className="container">
                    <Navbar />

                    <h2>Welcome to React CRUD Tutorial</h2> <br/>

                    <Route exact path='/product/' component={ Index } />
                    <Route path='/product/create' component={ Create } />
                    <Route path='/product/edit/:id' component={ Edit } />

                    {/*<Switch>*/}
                        {/*<Route exact path="/" component={Home} />*/}
                        {/*<Route path="/login" component={Login} />*/}
                        {/*<Route path="/register" component={Register} />*/}
                        {/*<PrivateRoute path="/dashboard" component={Dashboard} />*/}

                        {/*<Route path='/product/create' component={ Create } />*/}
                        {/*<PrivateRoute path='/product/edit/:id' component={ Edit } />*/}
                        {/*<PrivateRoute path='/product/index' component={ Index } />*/}
                    {/*</Switch>*/}

                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;




// // /client/src/App.js
//
// import React, { useState, useEffect } from "react";
//
// // SERVICES
// import userService from './services/user';
//
// function App() {
//     const [products, setUsers] = useState(null);
//
//     useEffect(() => {
//         if(!products) {
//             getUsers();
//         }
//     })
//
//     const getUsers = async () => {
//         try {
//             let res = await userService.getAll();
//             console.log(res);
//             setUsers(res);
//         } catch (error) {
//             alert(error.message)
//         }
//
//     }
//
//     const renderUser = user => {
//         return (
//             <li key={user._id} className="list__item product">
//                 <h3 className="product__name">{user.name}</h3>
//                 <p className="product__description">{user.description}</p>
//             </li>
//         );
//     };
//
//     return (
//         <div className="App">
//             <ul className="list">
//                 {(products && products.length > 0) ? (
//                     products.map(renderUser)
//                 ) : (
//                     <p>No products found</p>
//                 )}
//             </ul>
//         </div>
//     );
// }
//
// export default App;
