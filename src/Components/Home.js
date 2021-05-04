import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';
import Menubar from './Menubar';

class Home extends React.Component {
  render() {
    return (
    <div>
      <Header/>
      <Navbar/>
      <Menubar/>
      <div className="mainPic">
      <img src="assets/Nature/Sapling.png" alt="sapling"/>
        <div className="overview">
          <p>Anything and Everything to MAKE and MAINTAIN your Garden ...</p>
        </div>
      </div>
      <Footer/>
    </div>
     );
  }
}

export default Home;