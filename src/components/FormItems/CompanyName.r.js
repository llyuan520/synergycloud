// Created by liuliyuan on 2018/6/30
import React, {Component} from 'react'
import {Form, Select, message} from 'antd'
import PropTypes from 'prop-types'
import {request} from 'utils'

const FormItem = Form.Item;
const Option = Select.Option

function fetchTaxMain(value, callback) {
  request('/con/mdydirective/findCompanyByContract', {
    params: {
      name: value,
      //size:100
    }
  })
  .then((res) => {
    if (res.state === 'ok') {
      const result = res.data;
      const newData = [];
      result.forEach((r) => {
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

export default class CompanyName extends Component {
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
    this.props.onSearch && this.props.onSearch(value)
    if (typeof value !== 'undefined' && value !== null) {
      fetchTaxMain(value, data => {
        this.mounted && this.setState({
          companyItems: data
        })
      });
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
    <FormItem label='选择企业' {...formItemStyle}>
      {getFieldDecorator(fieldName, {
        initialValue: initialValue,
        ...fieldDecoratorOptions,
      })(
      <Select
      showSearch
      style={{width: '100%'}}
      optionFilterProp="children"
      onSearch={this.onSearch}
      placeholder="请选择企业"
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