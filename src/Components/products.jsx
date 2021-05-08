/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';
import Menubar from './Menubar';
import ProductService from '../services/product.service';

class products extends React.Component {

    constructor(props){
        super(props);
        this.state={
            products:[]
        }
    }

    componentDidMount(){
        ProductService.getProducts().then(res=>{
            console.log(res.data.message)
            this.setState({products:res.data.message});
        }).catch(err=>{
            console.log(err);
        });
    }

  render() {
      var referto="";
    return (
    <div>
      <Header/>
      <Navbar/>
      <Menubar/>
      <div className="productsAvailable">
                    <h2>Products Available</h2>
            </div> 
            <div className="bonsai">
                {
                this.state.products && this.state.products.map((val)=>{
                    referto="/productDetails/"+val.id;
                    return <div className="fruitbonsai" key={val.id}>
                    <a className="bonsaiBox" href={referto}><img src={val.images[0]} alt={val.productName}/>
                    <div className="box">
                    <h3>{val.productName}</h3>
                    </div></a>
                </div>
                    })
                }
            </div>
      <Footer/>
    </div>
     );
  }
}

export default products;