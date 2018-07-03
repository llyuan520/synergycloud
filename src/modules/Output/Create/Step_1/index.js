// Created by liuliyuan on 2018/6/30
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Row, Col, Form, Card, Upload, Icon, message, Button} from 'antd';
import {getFields} from 'utils'
import {requestDict, setSelectFormat} from 'utils'
import TableForm from './TableForm.r'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}


const tableData = [
  {
    key: '1',
    name: 'John Brown',
  },
  {
    key: '2',
    name: 'Jim Green',
  },
  {
    key: '3',
    name: 'Joe Black',
  },
];

class Step1 extends Component {
  state = {
    updateKey: Date.now(),
    loading: false,
    statusData: [],
    disabled: true
  }

  handleSubmit = (e) => {
    e && e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) return;
      this.props.history.push('/web/output/create/fill')
    });
  }

  //去数据字典里面的状态
  getStatus = () => {
    requestDict('com.moya.contract.enums.DirectiveStatusEnum', result => {
      this.setState({
        statusData: setSelectFormat(result)
      })
    })
  }

  componentDidMount() {
    this.getStatus()
  }

  render() {

    const {form} = this.props;
    const {getFieldDecorator, getFieldValue} = form;
    const {disabled} = this.state;

    return (
    <React.Fragment>
      <Form onSubmit={this.handleSubmit} layout="vertical" hideRequiredMark>
        <div className="advancedForm">
          <Card>
            <p>合同列表</p>

            <Row gutter={24}>
              {
                getFields(form, [
                  {
                    label: '合同名称：',
                    fieldName: 'company',
                    type: 'companyName',
                    span: 8,
                    formItemStyle: null,
                    fieldDecoratorOptions: {
                      /*rules:[
                          {
                              required:true,
                              message:'请选择企业'
                          }
                      ]*/
                    },
                  }, {
                    label: '合同编号：',
                    fieldName: 'project',
                    type: 'asyncSelect',
                    span: 8,
                    formItemStyle: null,
                    componentProps: {
                      fieldTextName: 'itemName',
                      fieldValueName: 'id',
                      doNotFetchDidMount: true,
                      fetchAble: getFieldValue('company') || false,
                      url: `/project/list/${getFieldValue('company')}`,
                    }
                  }, {
                    label: '合同状态：',
                    fieldName: 'project',
                    type: 'asyncSelect',
                    span: 8,
                    formItemStyle: null,
                    componentProps: {
                      fieldTextName: 'itemName',
                      fieldValueName: 'id',
                      doNotFetchDidMount: true,
                      fetchAble: getFieldValue('company') || false,
                      url: `/project/list/${getFieldValue('company')}`,
                    }
                  },

                ], 'vertical')
              }
            </Row>

            <Row gutter={24} className='content-flex-end'>
              {
                getFields(form, [
                  {
                    label: '选择项目：',
                    fieldName: 'number',
                    type: 'input',
                    span: 8,
                    formItemStyle: null,
                    fieldDecoratorOptions: {
                      /*rules:[
                          {
                              required:true,
                              message:'请选择企业'
                          }
                      ]*/
                    },
                  }, {
                    label: '选择公司：',
                    fieldName: 'type',
                    type: 'select',
                    span: 8,
                    options: [{label: '全部', key: ''}].concat(this.state.statusData),
                    fieldDecoratorOptions: {
                      initialValue: {label: '全部', key: ''},
                      /*rules:[
                          {
                              required:true,
                              message:'请选择变更类型'
                          }
                      ]*/
                    },
                    componentProps: {
                      labelInValue: true,
                    },
                  },

                ], 'vertical')
              }
              <Col className="gutter-row pb8" span={8}>
                <Button type="primary">搜索</Button>
              </Col>
            </Row>
            <Row gutter={24}>
              {getFieldDecorator('members', {
                initialValue: tableData,
              })(<TableForm form={this.props.form} next={() => this.setState({disabled: false})}/>)}
            </Row>
          </Card>
        </div>
        <div className="steps-action">
          <Button type="primary" onClick={this.handleSubmit} disabled={disabled}> 下一步</Button>
        </div>
      </Form>
    </React.Fragment>
    )
  }

}

export default Form.create()(withRouter(Step1))