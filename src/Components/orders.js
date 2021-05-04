import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';
import Menubar from './Menubar';

class Orders extends React.Component {
  render() {
    return (
    <div>
      <Header/>
      <Navbar/>
      <Menubar/>
      Orders Page
      <Footer/>
    </div>
     );
  }
}

export default Orders;