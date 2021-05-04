import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';
import Menubar from './Menubar';
import CartService from '../services/cart.service';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, TableFooter } from '@material-ui/core';
import cartService from '../services/cart.service';


class Cart extends React.Component {

    constructor(props){
        super(props);
        this.state={
            sum:0,
            products:[],
            totalPerItem:[]
        };
        this.initialState=this.state;
        this.setProducts=this.setProducts.bind(this);
        this.addToCart=this.addToCart.bind(this);
        this.checkout=this.checkout.bind(this);
        this.emptyCart=this.emptyCart.bind(this);
    }

    componentDidMount(){
        this.addToCart();
    }


    addToCart(){
        if(localStorage.getItem('productId')&&localStorage.getItem('productName')&&localStorage.getItem('productPrice')&&localStorage.getItem('email')){
            const email=localStorage.getItem('email');
            const prodInfo=[[localStorage.getItem('productId'),localStorage.getItem('productName'),1,localStorage.getItem('productPrice')]]
            CartService.addItems(email,prodInfo).then(res=>{
                console.log(res.data);
                localStorage.removeItem('productId');
                localStorage.removeItem('productName');
                localStorage.removeItem('productPrice');
                this.setProducts();
            }).catch(err=>{
                console.log(err);
            });
        }
        else{
          this.setProducts();
        }
        if(!localStorage.getItem('email')){
            this.props.history.push("/login");
            localStorage.removeItem('productId');
            localStorage.removeItem('productName');
            localStorage.removeItem('productPrice');
        }
    }

    async setProducts(){
        const email=localStorage.getItem('email');
        await CartService.getItems(email).then(res=>{
            res.data.message.map(user=>{
                if(user.email === email){
                   return this.setState({products:user.products});
                }
                return true;
            });
            this.calculateTotal();
        }
        ).catch(err=>{
            console.log(err);
        });
        
    }

    checkout(){
      localStorage.setItem('total',this.state.sum);
      localStorage.setItem('products',this.state.products);
      this.props.history.push("/orders");
    }

    async decrementQuantity(index){
      let products=this.state.products;
      products[index][2]=products[index][2]-1;
      if(products[index][2]<0){
        products[index][2]=0;
      }
      this.setState({products:products});
      await CartService.updateCart(localStorage.getItem('email'),this.state.products).then(res=>{
        console.log(res.data);
      }).catch(err=>{
        console.log(err);
      });
      this.calculateTotal();
    }

    async incrementQuantity(index){
      let products=this.state.products;
      products[index][2]=products[index][2]+1;
      this.setState({products:products});
      await CartService.updateCart(localStorage.getItem('email'),this.state.products).then(res=>{
        console.log(res.data);
      }).catch(err=>{
        console.log(err);
      });
      this.calculateTotal();
    }

    calculateTotal(){
      let totalPerItem=[];
      let sum=0;
            for(let i=0;i<this.state.products.length;i++){
              let sumPerItem=this.state.products[i][2]*this.state.products[i][3];
              sum+=sumPerItem;
              totalPerItem.push(sumPerItem);
            }
            this.setState({sum:sum,totalPerItem:totalPerItem});
            console.log(this.state);
    }

    async emptyCart(){
      await cartService.emptyCart(localStorage.getItem('email')).then(res=>{
        console.log(res.data);
      }).catch(err=>{
        console.log(err);
      });
      this.setProducts();
    }

  render() {
    const classes = makeStyles({
        table: {
          minWidth: 650,
        },
      });
    return (
    <div>
      <Header/>
      <Navbar/>
      <Menubar/>
      <div className="appleBonsai">
      <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Price Per Item</TableCell>
            <TableCell align="right">Total Per Item</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.products.map((val,index)=>{
            return(
            <TableRow key={val[0]}>
              <TableCell component="th" scope="row">
                {val[1]}
              </TableCell>
              <TableCell align="center"><Button onClick={()=>{this.decrementQuantity(index)}}>-</Button>
              {val[2]}
              <Button onClick={()=>{this.incrementQuantity(index)}}>+</Button></TableCell>
              <TableCell align="right">{val[3]}</TableCell>
              <TableCell align="right">{(val[2]*val[3]).toFixed(2)}</TableCell>
            </TableRow>
            
            )
        })
    } 
        <TableRow>
        <TableCell align="right" colSpan="3">Grand Total</TableCell>
          <TableCell align="right">{this.state.sum.toFixed(2)}</TableCell>
        </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan="2" align="center"><Button color="secondary" onClick={this.emptyCart}>Empty Cart</Button></TableCell>
            <TableCell colSpan="2" align="center"><Button color="secondary" onClick={this.checkout}>Proceed to CheckOut</Button></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </div>  
      <Footer/>
    </div>
     );
  }
}

export default Cart;