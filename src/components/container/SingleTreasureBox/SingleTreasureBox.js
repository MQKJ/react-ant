import React, { Component } from 'react';
import { Link } from "react-router-dom";

class SingleTreasureBox extends Component{
    render(){
        return (
            <div>
                <Link to='/other'>不是新来的</Link>
                <div>this a Home page{this.props.children}</div>
            </div>
        )
    }
}

export default SingleTreasureBox;
