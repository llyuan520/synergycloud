/**
 *
 * Created by fanzhe on 2018/7/5
 */
import React, {Component} from 'react';
import {Button, Modal, Form, Row, Col, Divider, Input} from 'antd';
import './styles.less'


class PopModal extends Component {
  static defaultProps = {
    type: 'edit',
    visible: true
  }
  state = {
    initData: {},
    userId: "",
  }

  callback = (key, name) => {
    const {setFieldsValue} = this.props.form;
    setFieldsValue({
      [name]: key.length > 0 && true
    })
    console.log(key, name);
  }

  handleSubmit = (e) => {
    e && e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.setData(values)
        this.props.toggleModalVisible(false);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.visible) {
      /**
       * 关闭的时候清空表单
       * */
      nextProps.form.resetFields();
      this.setState({
        defaultData: {}
      })
    }
    if (this.props.visible !== nextProps.visible && !this.props.visible && nextProps.modalConfig.type !== 'add') {
      /**
       * 弹出的时候如果类型不为新增，则异步请求数据
       * */


    }
  }

  mounted = true

  componentWillUnmount() {
    this.mounted = null
  }

  render() {
    const props = this.props;
    const {userId} = this.state;
    return (
    <Modal
    maskClosable={false}
    destroyOnClose={true}
    onCancel={() => props.toggleModalVisible(false)}
    width={980}
    visible={props.visible}
    footer={
      <Row>
        <Col span={12}></Col>
        <Col span={12}>
          <Button onClick={() => props.toggleModalVisible(false)}>取消</Button>
          <Button type="primary" onClick={this.handleSubmit}>确定</Button>
        </Col>
      </Row>
    }
    title='请Ta来写形象进度'>
      <div className="editContent">
        <Row>
          <Col span={12}>
            <span>合同名称：</span>
            <span className="item-text">青岛万科未来城项目底商幕墙工程合同</span>
          </Col>
          <Col span={12}>
            <span>合同编号：</span>
            <span className="item-text">QD-HJB-01Q-施工-0004-设计变更-0001</span>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <span>甲方：</span>
            <span className="item-text">山东自立幕墙工程有限公司</span>
          </Col>
          <Col span={12}>
            <span>乙方：</span>
            <span className="item-text">青岛远房地产土地评估造价咨询有限公司</span>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <span>合同金额：</span>
            <span className="item-text-red">3,888,888.00</span>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <span>产值类型：</span>
            <span className="item-text">进度产值</span>
          </Col>
          <Col span={12}>
            <span>发票类型：</span>
            <span className="item-text">增值税专票</span>
          </Col>
        </Row>
      </div>
      <Divider/>
      <div className="editByOther">
        <div className="text">请Ta来写</div>
        <Input placeholder="请输入Ta在平台上的账号" value={userId} onChange={value => this.setState({userId: value})}/>
      </div>
    </Modal>
    )
  }
}

export default Form.create()(PopModal)