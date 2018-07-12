// created by Lee in 2018/07/05

import React,{Component} from 'react'
import {  Button,Form,Row,Col, Card, message } from 'antd';
import { request, getQueryString} from 'utils';
import { compose } from 'redux';
import {connect} from 'react-redux';
import Stages from './StagesEdit'
import './styles.less'
class TabPane3 extends Component{

    constructor(props){
        super(props);
        this.state = {
            data: [],
            stages_options: [],
            name_options: [],
            type_options: [],//角色类型选项
            member_options: [],//角色成员选项
            editable:[],
            idArr: props.idArr || []
        }
    }

    toggleEditable = (e,index)=>{
        e && e.preventDefault()
        let { editable } = this.state
        console.log(index);
        editable[index] = !editable[index];
        this.setState({
            editable: editable
        })
    }

    componentWillMount(){
        //获取项目组织架构的
        let id = getQueryString('id');
        request('/biz/itemsorganzation/findViewData',{
            params:{
                items_id:id,
            }
        }).then((data)=>{
            console.log(data)
            if(data.state === 'ok'){
                console.log(data);
                let dataSource = [];
                let editable = [];
                const { organizations } = data.data;
                const { idArr } = this.state;
                idArr.map((item,index)=>{
                    editable.push(false);
                    dataSource[index] = [];
                    organizations.map((e,i)=>{
                        if(item == e.stages_id){
                            dataSource[index].push({
                                key: e.id,
                                role_type: e.role_typeName ,
                                role_name: e.itemsrole_name,
                                username: e.user_name.split(','),
                                stages_id: e.stages_id,
                                editable: false,
                                isNew: false,
                            })
                        }

                    })
                })
                this.setState({
                    data: dataSource,
                    editable: editable
                })
            }
        }).catch(err => {
            console.log(err)
            message.error(err.message)
        })

        request('/biz/itemsorganzation/findEditData', {
            params:{
                company_id: this.props.company_id,
                items_id: id
            }
        }).then((data) => {
            if(data.state === 'ok'){

                let rolenameOptions = [];
                let stages_options = [];
                let role_name = data.data.role_name;
                let stages = data.data.stages;
                for(let i =0;i< role_name.length;i++){
                    rolenameOptions.push({
                        label:role_name[i].name,
                        key:role_name[i].id
                    })
                }
                for(let i =0;i< stages.length;i++) {
                    stages_options.push({
                        label: stages[i].stages_name,
                        key: stages[i].id,
                        tax_type: stages[i].tax_type
                    })
                }
                this.setState({
                    name_options:rolenameOptions,
                    stages_options: stages_options,
                })
            }
        })
            .catch(err => {
                console.log(err)
                message.error(err.message)
            })
    }


    render(){
        const {data,name_options,type_options,member_options,editable} = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <Card bordered={false}>
                <Form>
                    {
                        this.state.stages_options.length > 0 ?
                            this.state.stages_options.map((item,index)=>{
                                return (
                                    <React.Fragment key={item.key}>
                                        <div className="stagesTitleStyle">
                                            <Row gutter={24}>
                                            <Col span={22}>{ `分期${index+1}` }</Col>
                                            <Col span={2}>
                                                <Button size="small" onClick={ e =>this.toggleEditable(e,index) }>
                                                    { editable[index] ? '取消' : '编辑'}
                                                </Button>
                                            </Col>
                                            </Row>
                                        </div>
                                        <div className="stagesBoxStyle">
                                            <Row>
                                                <h2 style={{marginLeft:30}}>{item.label}</h2>
                                            </Row>
                                            {getFieldDecorator(`members${index}`, {
                                                initialValue: data[index],
                                            })(
                                                <Stages
                                                    data={data[index]}
                                                    name_options={name_options}
                                                    type_options={type_options}
                                                    member_options={member_options}
                                                    stages_id={item.key}
                                                    editable={ editable[index] }
                                                />
                                            )}

                                        </div>
                                    </React.Fragment>
                                )
                            })
                            :
                            <div>
                                '暂无数据'
                            </div>
                    }
                </Form>
            </Card>
        )
    }



}



const enhance = compose(
    connect(state=>({
        company_id:state.user.getIn(['personal','company_id'])
    })),
    Form.create()
)
export default enhance(TabPane3);
