// Created by liuliyuan on 2018/7/2
import React from 'react'
import { Select } from 'antd';
const Option = Select.Option;

export default class SelectCell extends React.Component {
    render() {
        const {getFieldDecorator,fieldName,initialValue,componentProps,options=[]} = this.props;
        return (
            <div className="editable-cell-select-wrapper">
                {
                    getFieldDecorator(`${fieldName}`,{
                        initialValue:initialValue
                    })(

                        <Select {...componentProps} style={{width:'100%'}} >
                            {
                                options.map((option,i)=>(
                                    <Option key={i} value={option.key}>{option.label}</Option>
                                ))
                            }
                        </Select>
                    )
                }
            </div>
        );
    }
}