/* eslint-disable react/jsx-no-comment-textnodes */
import './App.css';
import {BrowserRouter,Switch, Route, Redirect} from 'react-router-dom';
import Home from './Components/Home';
import aboutUs from './Components/aboutUs'; 
import products from './Components/products';
import Login from './Components/login';
import contactUs from './Components/contactUs';
import Feedback from './Components/feedback';
import ProductDetails from './Components/productDetails';
import ProductByCategory from './Components/productsByCategory';
import Cart from './Components/cart';
import Orders from './Components/orders';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/aboutUs" component={aboutUs} />
        <Route exact path="/products" component={products} />
        <Route exact path="/login" component={Login}/>
        <Route exact path="/contactUs" component={contactUs}/>
        <Route exact path="/feedback" component={Feedback}/>
        <Route exact path="/productsByCategory/:id" component={ProductByCategory}/>
        <Route exact path="/productDetails/:id" component={ProductDetails}/>
        <Route exact path="/cart" component={Cart}/>
        <Route exact path="/orders" component={Orders}/>
        <Redirect to="/" />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
