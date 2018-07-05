// Created by liuliyuan on 2018/7/5
import React from 'react'
import { CusFormItem } from '../../components'
export default class NumericInputCell extends React.Component {
    render() {
        const {getFieldDecorator,fieldName,initialValue,componentProps} = this.props;
        return (
            <div className="editable-cell-input-wrapper">
                {
                    getFieldDecorator(`${fieldName}`,{
                        initialValue:initialValue
                    })(
                        <CusFormItem.NumericInput {...componentProps} style={{textAlign:'right',backgroundColor: '#E2F6FF'}} />
                    )
                }
            </div>
        );
    }
}