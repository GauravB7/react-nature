/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {NavLink} from 'react-router-dom';
import ProductCategory from '../services/productCategory.service';

class Navbar extends React.Component {

  constructor(props){
    super(props);
    this.state={
      categories:[]
    }
  }

  componentDidMount(){
    ProductCategory.getProductCategories().then(res=>{
      this.setState({categories:res.data.message});
    }).catch(err=>{
      console.log(err);
    });
  }
  
  render() {
    var referto="";
    return (<div className="nav">
    <nav>
        <ul>
            <li><NavLink
                        activeClassName="menu_active"
                        className="nav-link"
                        to="/"
                      >HOME</NavLink></li>
            <li><div className="dropdown">
                <NavLink
                        activeClassName="menu_active"
                        className="nav-link"
                        to="/products"
                      >
                       <button className="dropbtn">PRODUCTS</button> 
                </NavLink>
                    <div className="dropdown-content">
                        {
                        this.state.categories && this.state.categories.map((val)=>{
                          referto="/productsByCategory/"+val.id;
                          return <a key={val.id} href={referto}>{val.name}</a>
                          })
                        }
                    </div>
                </div></li>
            <li><NavLink
                        activeClassName="menu_active"
                        className="nav-link"
                        to="/aboutUs"
                      >
                        ABOUT US
                </NavLink></li>
            <li><NavLink
                        activeClassName="menu_active"
                        className="nav-link"
                        to="/contactUs"
                      >
                        CONTACT US
                </NavLink></li>
            <li><NavLink
                        activeClassName="menu_active"
                        className="nav-link"
                        to="/feedback"
                      >
                        FEEDBACK
                </NavLink></li>
        </ul>
    </nav>
</div>);
  }
}

export default Navbar;