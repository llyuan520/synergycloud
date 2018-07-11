/**
 *
 * Created by fanzhe on 2018/7/11
 *
 * Copy CompanyName.r.js
 */


import React from "react";
import {Form, Select, message} from 'antd'
import PropTypes from 'prop-types'
import {request} from 'utils'

const FormItem = Form.Item;
const Option = Select.Option;

let time;

function fetchTaxMain(value, callback) {
    request('/con/contract/getContractByName', {
        params: {
            contractname: value,
            //size:100
        }
    })
    .then((res) => {
        console.log(res);
        if (res.state === 'ok') {
            const result = res.data;
            const newData = [];
            result.data && result.data.contract.forEach((r) => {
                newData.push({
                    key: `${r.id}`,
                    label: r.name,
                });
            });
            callback(newData);
        } else {
            return Promise.reject(res.message);
        }
    })
    .catch(err => {
        err && message.error(err.message);
    });
}

class OutputName extends React.Component {
    static propTypes = {
        form: PropTypes.object.isRequired,
        formItemStyle: PropTypes.object,
        fieldName: PropTypes.string,
        whetherShowAll: PropTypes.bool,
        notShowAll: PropTypes.bool,
        fieldDecoratorOptions: PropTypes.object,
        componentProps: PropTypes.object
    }
    static defaultProps = {
        formItemStyle: {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 18
            }
        },
        fieldName: 'supplier',
        whetherShowAll: false,
        notShowAll: false,
        fieldDecoratorOptions: {}
    }
    state = {
        companyItems: []
    }
    onSearch = (value) => {
        this.props.onSearch && this.props.onSearch(value);
        if (typeof value !== 'undefined' && value !== null) {
            clearTimeout(time);
            time = setTimeout(() => {
                fetchTaxMain(value, data => {
                    this.mounted && this.setState({
                        companyItems: data
                    })
                });
            }, 500)
        }
    }

    componentDidMount() {
        fetchTaxMain('', data => {
            this.mounted && this.setState({
                companyItems: data
            })
        });
    }

    mounted = true

    componentWillUnmount() {
        this.mounted = null;
    }

    render() {
        const {companyItems} = this.state;
        const {getFieldDecorator} = this.props.form;
        const {formItemStyle, fieldName, initialValue, fieldDecoratorOptions, componentProps} = this.props;
        return (
        <FormItem label='合同名称' {...formItemStyle}>
            {getFieldDecorator(fieldName, {
                initialValue: initialValue,
                ...fieldDecoratorOptions,
            })(
            <Select
            showSearch
            style={{width: '100%'}}
            optionFilterProp="children"
            onSearch={value => this.onSearch(value)}
            placeholder="请选择合同名称"
            {...componentProps}
            >
                {
                    companyItems.map((item, i) => (
                    <Option key={i} value={item.key}>{item.label}</Option>
                    ))
                }
            </Select>
            )}
        </FormItem>
        )
    }
}

export default Form.create()(OutputName)