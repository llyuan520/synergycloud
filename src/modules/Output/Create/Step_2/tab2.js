// Created by liuliyuan on 2018/7/2
import React, {Component} from 'react'
import TableForm from "./TableForm.r";

export default class TabPane2 extends Component {
  render() {
    return (
    <div>
      <TableForm
      disabled={this.props.disabled}
      onChange={() => {
        console.log(1);
      }}/>
    </div>
    )
  }
}