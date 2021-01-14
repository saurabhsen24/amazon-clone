import './App.css';
import { BrowserRouter as Router, Switch , Route } from 'react-router-dom';
import Header from './Header';
import Home from "./Home";
import Checkout from './Checkout';
import Login from './Login';
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';
import { auth } from './firebase';
import Payment from './Payment';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Orders from './Orders';


const stripePromise = loadStripe('pk_test_51I8jxrBUpyaRBJKBawnBGOmsFi0HSLoHw3Iw59oVj0g4IWkFcpKt7GyregWkdp60UaPyk54M3XkTiamv1BbQuoYb00LN0k6Zka');

function App() {

  const [ {user} , dispatch] = useStateValue()

  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }else{
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
    return () => {
      unsubscribe();
    }
  }, [])

  return (
    <Router>
      <div className="app">
        <Switch>

          <Route path="/orders">
              <Header/>
              <Orders/>
          </Route>

          <Route path="/checkout">
            <Header/>
            <Checkout/>
          </Route>
          
          <Route path="/login">
            <Login/>
          </Route>

          <Route path="/payment">
            <Header/>
            <Elements stripe={stripePromise}>
                <Payment/>
            </Elements>
          </Route>
          
          <Route path="/">
            <Header/>
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
