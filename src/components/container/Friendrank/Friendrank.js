import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Friendrank extends Component{
    constructor(props) { //构造函数，在创建组件的时候调用一次
        super(props);
        this.state = {
        };
    }
    componentWillMount(){ //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
        document.title = '出行保'; // title
    }
    componentDidMount() { //在组件挂载之后调用一次。这个时候，子主键也都挂载好了，可以在这里使用refs。

    }
    componentWillReceiveProps(nextProps) { //props是父组件传递给子组件的。父组件发生render的时候子组件就会调用componentWillReceiveProps（不管props有没有更新，也不管父子组件之间有没有数据交换）。

    }
    render(){
        return (
            <div>
                <Link to='/other'>不是新来的</Link>
                <div>this a Home page{this.props.children}</div>
            </div>
        )
    }
}

export default Friendrank;
