//create by Lee on 2018/7/11

import React, { Component } from 'react';
import {  Button } from 'antd';
import {Link} from 'react-router-dom'
const ButtonGroup = Button.Group;

class ButtonList extends Component{
    constructor(){
        super();
        this.state={
            ButtonIndex:0
        }
    }

    render(){

        return (
            <ButtonGroup>
                <Button onChange={this.props.onChange(this.state.ButtonIndex)}>变更单</Button>
                <Button >产值单</Button>
                <Button >结算单</Button>
                {/*<Button>付款</Button>*/}
                {/*<Button>索赔</Button>*/}
            </ButtonGroup>

        )

    }


}