import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Merchants from './components/Merchants/Merchants';
import Pagination from "./components/Pagination";
import MerchantDetails from"./components/Merchant_details/Merchant";


class App extends Component {

  constructor(){
    super()
    this.state={
      pages: 1,
      merchants: [],
      current: 1,
      selectedMerchantID: null,
      displayMerchants: true,
      displayMerchantInfo: false
    }
  }

  componentDidMount(){
    fetch('https://myfave.com/api/v1/search/partners?city=kuala-lumpur&page=1&limit=60')
    .then(results => results.json())
    .then(json => {
      console.log(json)
        this.setState({
            merchants: json.outlets,
            pages: Math.floor(json.total/60)+1
        })
    })
  }

  navigate = (e) => {
    fetch('https://myfave.com/api/v1/search/partners?city=kuala-lumpur&page='+e.target.value+'&limit=60')
    .then(results => results.json())
    .then(json => {
        this.setState({
            merchants: json.outlets,
            pages: Math.floor(json.total/60)+1
        })
    })
  }

  merchantSelectedHandler = (id) =>{
    this.setState({
      selectedMerchantID: id,
      displayMerchantInfo: true,
      displayMerchants: false
    })
    console.log(this.state.selectedMerchantID)
  }

  displayMerchants = () =>{
    this.setState({
      displayMerchantInfo: false,
      displayMerchants: true,
    })
  }

  render() {

    let merchants = null,
    merchantDetails = null,
    pagination = null;

    let arr =[];
    for(let x=1; x<=this.state.pages; x++){
      arr.push(x);
    }

    if(this.state.displayMerchants){
      merchants = this.state.merchants.map(merchant => {
        return (<Merchants clicked={()=>this.merchantSelectedHandler(merchant.company.id)} key={merchant.company.id} name={merchant.company.name} address={merchant.name} logo={merchant.company.logo}/>)
      });

      pagination = arr.map((pagination, index) => {
        return <Pagination click={this.navigate} key={index} num={pagination} value={pagination}></Pagination>
      })

    }

    if(this.state.displayMerchantInfo){
      merchantDetails = <MerchantDetails id={this.state.selectedMerchantID}/>;
    }

    return (
        <div className="App">
          <Header click={this.displayMerchants}></Header>
          <section id="merchants-list" class={this.state.displayMerchantInfo ? "hidden" : null}>
              <ul>
                {merchants}
              </ul>
          </section>
          <section id="pagination" class={this.state.displayMerchantInfo ? "hidden" : null}>
            <ul>
              {pagination}
            </ul>
          </section>
          {merchantDetails}
        </div>
    );
  }
}

export default App;