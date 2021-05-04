/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';
import Menubar from './Menubar';
import ProductService from '../services/product.service';


class ProductDetails extends React.Component {

    constructor(props){
        super(props);
        this.state={
            id: this.props.match.params.id,
            product:{id:'',},
            position:''
        }
        this.addProduct=this.addProduct.bind(this);
    }

    componentDidMount(){
        ProductService.getProduct(this.state.id).then(res=>{
            console.log(res.data.message);
            let prod=res.data.message[0];
            let id= prod.id;
            let categoryId= prod.categoryId;
            let productName= prod.productName;
            let images= prod.images.slice(1, );
            let description= prod.description;
            let price= prod.price;
            let position=description.split("Position :")[1];
            this.setState({position:position});
            description=description.split("Position :")[0];
            this.setState({product:{id:id,categoryId:categoryId,productName:productName,images:images,description:description,price:price}});
        }).catch(err=>{
            console.log(err);
        });
    }

    addProduct(){
      console.log(this.state);
      localStorage.setItem('productId',this.state.product.id);
      localStorage.setItem('productName',this.state.product.productName);
      localStorage.setItem('productPrice',this.state.product.price);
      this.props.history.push("/cart");
    }

  render() {
      
    return (
    <div>
      <Header/>
      <Navbar/>
      <Menubar/>
      <div className="appleBonsai" >
        <div className="Description">
        <h2>{this.state.product.productName}</h2>
        </div>
        <div className="appleImage">
            {
            this.state.product.images && this.state.product.images.map((val,index)=>{
            return <span key={index}>
            <img className="apple1" src={val} alt={this.state.product.productName}/>
            </span>
          })
        }
        </div>
    <div className="Description">
        <p>{this.state.product.description}<br />
        <b>Position :</b>{this.state.position}</p>
      <div className="select">
        <h3>$24.55</h3>
        <input type="submit" value="Buy Product" onClick={this.addProduct} />
        <a href="/products"><input type="submit" value="Back"/></a>
      </div>
  </div>
</div>
      <Footer/>
    </div>
     );
  }
}

export default ProductDetails;