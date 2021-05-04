import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Menubar from './Menubar';
import Footer from './Footer';

class aboutUs extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Navbar/>
        <Menubar/>
        <div className="aboutUs">
          <h2>About Us</h2>
          <h3>
            We, at Nature's Paradise provide everything to make and maintain your Garden.
          </h3>
          <h3>From saplings to Manure and other tools required to take good care of your
            beloved Garden, Nature's Paradise is one stop destination for you.
          </h3>
          <h3> We provide quality products at reasonable rates so that you can make your
            Garden a dream place.
          </h3>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default aboutUs;