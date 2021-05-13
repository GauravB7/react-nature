import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';
import Menubar from './Menubar';
import CartService from '../services/cart.service';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import UserService from '../services/user.service';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '../Components/Pagination';
import StoreSharpIcon from '@material-ui/icons/StoreSharp';


  class Cart extends React.Component {

    constructor(props){
        super(props);
        this.state={
            sum:0,
            products:[],
            totalPerItem:[],
            page:0,
            rowsPerPage:5
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
                UserService.logout();
                this.props.history.push("/login");
            });
        }
        else{
          this.setProducts();
        }
        if(!localStorage.getItem('email')){
            this.props.history.push("/login");
        }
    }

    async setProducts(){
        const email=localStorage.getItem('email');
        await CartService.getItems(email).then(res=>{
            console.log(res.data);
          if(res.data.message.length>0){
            this.setState({products:res.data.message[0].products});
            this.calculateTotal();
          } 
        }
        ).catch(err=>{
            console.log(err);
            UserService.logout();
            this.props.history.push("/login");
        });
        
    }

    checkout(){
      if(window.confirm("Are you sure you want to place the order?")){
        if(this.state.sum>0){
          localStorage.setItem('total',this.state.sum);
          localStorage.setItem('total_per_item',JSON.stringify(this.state.totalPerItem));
        }
        this.props.history.push("/orders");
      }
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
      if(window.confirm("Are you sure you want to empty cart?")){
      await CartService.emptyCart(localStorage.getItem('email')).then(res=>{
        console.log(res.data);
      }).catch(err=>{
        console.log(err);
      });
      this.setProducts();
    }
    }
  

  render() {
    const classes = makeStyles({
        table: {
          minWidth: 500,
        },
      });

    const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.products.length - this.state.page * this.state.rowsPerPage);

    const handleChangePage = (event, newPage) => {
        this.setState({page:newPage})
    };
    
    const handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage:parseInt(event.target.value, 10)})
        this.setState({page:0})
    };


    return (
    <div>
      <Header/>
      <Navbar/>
      <Menubar/>
      <div className="loginBlock">
            <h3>MY CART</h3>
      </div>
      <div className="appleBonsai">
      <TableContainer component={Paper}>
      {this.state.products.length<1?<h2>Your Cart is Empty</h2>:
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Sr. No.</strong></TableCell>
            <TableCell><strong>Product Name</strong></TableCell>
            <TableCell align="center"><strong>Quantity</strong></TableCell>
            <TableCell align="right"><strong>Price Per Item</strong></TableCell>
            <TableCell align="right"><strong>Total Per Item</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          (this.state.rowsPerPage > 0
            ? this.state.products.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
            : this.state.products
          ).map((val,index)=>{
            return(
            <TableRow key={val[0]}>
              <TableCell component="th">
                {index+1+this.state.page * this.state.rowsPerPage}
              </TableCell>
              <TableCell component="th" scope="row">
                {val[1]}
              </TableCell>
              <TableCell align="center"><Button onClick={()=>{this.decrementQuantity(index)}}>-</Button>
              {val[2]}
              <Button onClick={()=>{this.incrementQuantity(index)}}>+</Button></TableCell>
              <TableCell align="right">${val[3]}</TableCell>
              <TableCell align="right">${(val[2]*val[3]).toFixed(2)}</TableCell>
            </TableRow>    
            )
        })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
            <TableRow>
                <TableCell align="right" colSpan="4">Grand Total</TableCell>
            <TableCell align="right">${this.state.sum.toFixed(2)}</TableCell>
            </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={5}
              count={this.state.products.length}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
          {
            this.state.products.length>0?<TableRow>
            <TableCell colSpan="3" align="center"><Button variant="contained" style={{ backgroundColor:"#8BC34A" }}  onClick={this.emptyCart}>Empty Cart</Button></TableCell>
            <TableCell colSpan="2" align="center">
              <Button variant="contained"  style={{ backgroundColor:"#8BC34A" }} onClick={this.checkout}>Confirm Order<StoreSharpIcon></StoreSharpIcon></Button></TableCell>
            </TableRow>:
            <TableRow>
              <TableCell colSpan="2" align="center"><Button variant="contained" disabled onClick={this.emptyCart}>Empty Cart</Button></TableCell>
              <TableCell colSpan="2" align="center">
              <Button variant="contained" disabled onClick={this.checkout}>Confirm Order<StoreSharpIcon></StoreSharpIcon></Button></TableCell>
            </TableRow>
        }
        </TableFooter>
      </Table>
  }
    </TableContainer>
    </div>  
      <Footer/>
    </div>
  );
  }
}

export default Cart;