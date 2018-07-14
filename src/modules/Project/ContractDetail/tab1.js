//create by lee on 2018/07/13
import React,{ Component } from 'react';
import {  Button } from 'antd';
import Tablecom from './Tablecom'
const ButtonGroup = Button.Group;

class TabPane1 extends Component{

    constructor(){
        super();
        this.state = {
            ButtonBoxIndex:0,
            updateKey: Date.now()
        }
    }

    onClickEvent = (e, btnIndex)=>{
        console.log(Date.now())
        console.log(btnIndex);
        let time = Date.now();
        this.setState({
            ButtonBoxIndex: btnIndex,
            updateKey: time
        })
    }

    render(){
        const { ButtonBoxIndex } = this.state;
        console.log(ButtonBoxIndex)
        return (
            <div>
                <div style={{paddingLeft:20,paddingTop:5}}>
                    <ButtonGroup >
                        <Button onClick={ e=>this.onClickEvent(e,0) }>变更单</Button>
                        <Button onClick={ e=>this.onClickEvent(e,1) }>产值单</Button>
                        <Button onClick={ e=>this.onClickEvent(e,2) }>结算单</Button>
                        {/*<Button>付款</Button>*/}
                        {/*<Button>索赔</Button>*/}
                    </ButtonGroup>
                </div>
                <div style={{paddingLeft:20,paddingTop:5}}>
                    <Tablecom ButtonBoxIndex={ButtonBoxIndex} updateKey={ this.state.updateKey }/>
                </div>
            </div>

        )

    }

}

export default TabPane1;