/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';
import Menubar from './Menubar';
import ProductCategory from '../services/productCategory.service';

class ProductByCategory extends React.Component {

    constructor(props){
        super(props);
        this.state={
            id: this.props.match.params.id,
            products:[],
            category:{}
        }
    }

    componentDidMount(){
        ProductCategory.getProductByCategories(this.state.id).then(res=>{
            //console.log(res.data.message);
            //console.log(this.state.id);
            this.setState({products:res.data.message});
        }).catch(err=>{
            console.log(err);
        });
        ProductCategory.getProductCategory(this.state.id).then(res=>{
            //console.log(res.data.message);
            this.setState({category:res.data.message[0]});
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
                    <h3>{this.state.category.name}</h3>
            </div> 
            <div className="bonsai">
                {this.state.products && this.state.products.map((val)=>{
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

export default ProductByCategory;