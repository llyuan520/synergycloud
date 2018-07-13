// created by Lee in 2018/07/05

import React,{Component} from 'react'
import {  Button,Form,Row,Col, Card, message } from 'antd';
import { request, getQueryString,setSelectFormat} from 'utils';
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
            idArr: props.idArr || [],
            edit: props.edit || ''
        }
    }

    toggleEditable = (e,index)=>{
        e && e.preventDefault()
        let { editable } = this.state
        editable[index] = !editable[index];
        this.setState({
            editable: editable
        })
    }

    handleSubmit = (e,index)=>{
        e && e.preventDefault();
        this.props.form.validateFields((err, value) => {
            console.log(value[`members${index}`])
            console.log(this.state.idArr[index]);
            let company_id = this.props.company_id;
            let items_id = getQueryString('id');
            let body = {
                model:{
                    company_id,
                    items_id
                },
                stages:[]
            }
            let tmpArr = value[`members${index}`];
            body.stages[0] = {}
            body.stages[0].members = [];
            for(let i = 0;i< tmpArr.length;i++){
                body.stages[0].itemsstages_id = tmpArr[i].stages_id;
                let obj = {
                    organization_id: tmpArr[i].organization_id ? tmpArr[i].organization_id : "",
                    user_id: tmpArr[i].username.join(','),
                    itemsrole_id: tmpArr[i].role_name,
                    role_type: tmpArr[i].role_type_key,
                    person_id: tmpArr[i].person_id ? tmpArr[i].person_id : ''
                }

                body.stages[0].members.push(obj);
            }
            console.log(body);

            request('/biz/itemsorganzation/save',{
                method: 'POST',
                body: body
            }).then((data)=>{
                console.log(data);
                if(data.state === 'ok'){
                    message.success('保存成功');
                    let editable = this.state.editable;
                    editable[index] = false;
                    this.setState({
                        editable: editable
                    })
                }else{
                    message.error('保存失败');
                }
            }).catch(err=>{
                console.log(err);
                message.error(err.message);
            })


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
            console.log(data);
            if(data.state === 'ok'){
                let dataSource = [];
                let editable = [];
                const { organizations } = data.data;
                const { idArr } = this.state;
                idArr.map((item,index)=>{
                    editable.push(false);
                    dataSource[index] = [];
                    organizations.map((e,i)=>{
                        if(item === e.stages_id){
                            let members_options = [];
                            this.getRoleTypeAndPerson(e.itemsrole_id, (data) => {
                                members_options = setSelectFormat(data.person,'id','name');
                                dataSource[index].push({
                                    key:i,
                                    organization_id: e.id,
                                    role_type: e.role_typeName,
                                    role_type_key: e.role_type,
                                    role_name: e.itemsrole_id,
                                    person_id:e.person_id,
                                    username: e.user_id ? e.user_id.split(',') : [],
                                    stages_id: e.stages_id,
                                    editable: false,
                                    isNew: false,
                                    members_options:members_options,
                                })
                            })
                        }

                        return dataSource
                    })
                    return dataSource
                })
                setTimeout(()=>{
                    this.setState({
                        data: dataSource,
                        editable: editable
                    })
                },200)

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


    getRoleTypeAndPerson = (value,cb)=>{
        let id = getQueryString('id')
        request('/biz/itemsorganzation/getRoleTypeAndPerson', {
            params:{
                role_id: value,
                company_id: this.props.company_id,
                items_id: id,
            }
        }).then((data) => {
            if(data.state === 'ok'){
                cb && cb(data.data)
            }
        })
            .catch(err => {
                console.log(err)
                message.error(err.message)
            })
    }


    render(){
        const {data,name_options,type_options,member_options,editable,edit} = this.state;
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
                                                    {
                                                        edit === 'edit' ?
                                                        <Button size="small" onClick={ e =>this.toggleEditable(e,index) }>
                                                            {editable[index] ? '取消' : '编辑'}
                                                        </Button>
                                                        : ''
                                                    }

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
                                            <div className="saveBoxStyle">
                                                <Row gutter={24}>
                                                    <Col span={22}></Col>
                                                    <Col span={2}>
                                                        {
                                                            editable[index] ?
                                                            <Button  size="small" type="primary" onClick={ (e)=>this.handleSubmit(e,index)} >保存</Button>
                                                                : ""
                                                        }
                                                    </Col>
                                                </Row>
                                            </div>
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
