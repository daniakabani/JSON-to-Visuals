import React, {Component} from 'react';
import './Merchant.scss';

class Merchant extends Component{

    constructor(){
        super()
        this.state={
            isLoaded: null
        }
    }

    componentDidMount(){
        console.log(this.props.id)
        if(this.props.id){
            if( !this.state.isLoaded || (this.state.isLoaded && this.state.isLoaded.company.id !== this.props.id)) {
                fetch('https://api.myfave.com/api/fave/v1/cities/kuala-lumpur/companies/'+this.props.id)
                .then(results => results.json())
                .then(json => {
                    this.setState({
                        isLoaded: json
                    })
                })
            }
        }
    }

    render(){
        let values = <p>loading</p>
        // if(this.props.id){
        //     values = (
        //         <p>loading</p>
        //     )
        // }
        if(this.state.isLoaded){
            values = (
                <section id="merchant-details">
                    <div class="sub-banner">
                        <figure>
                            <img alt="merchant featured banner" src={this.state.isLoaded.company.featured_image}/>
                        </figure>
                    </div>
                    <div class="content">
                        <div class="info">
                            <div class="floating-image">
                                <img src={this.state.isLoaded.company.logo} alt="logo"/>
                            </div>
                            <article className="main-content">
                                <h1>{this.state.isLoaded.company.name}</h1>
                                <h2>{this.state.isLoaded.company.location}</h2>
                                <h3>{this.state.isLoaded.company.phone}</h3>
                                <h3>{this.state.isLoaded.company.email}</h3>
                            </article>
                            <cite>
                                <p>{this.state.isLoaded.company.description}</p>
                            </cite>
                        </div>
                        <div class="featured-reviews">
                            <header>
                                <h2>featured reviews</h2>
                            </header>
                            <ul>
                                {this.state.isLoaded.company.reviews.map(({rating, comment, name}) => 
                                    <li>
                                        <h2>{name}</h2>
                                        <h3>{rating}/5</h3>
                                        <p>{comment}</p>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </section>
            )
        }
        return values;
    }
}
export default Merchant