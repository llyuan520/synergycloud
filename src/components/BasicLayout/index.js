// Created by liuliyuan on 2018/7/4
import React,{Component} from 'react'

export default class BasicLayout extends Component {
    render(){
        const { title , children } = this.props;
        return(
            <div className="ISA-fragment ISA-bgColor">
                <h2> { title } </h2>
                <div className="steps-main">
                    <div className="steps-content">
                        { children ? children : null }
                    </div>
                </div>
            </div>

        )
    }
}