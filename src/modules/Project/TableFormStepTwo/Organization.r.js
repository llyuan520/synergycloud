// created by Lee in 2018/07/05
import React, { PureComponent } from 'react';
import {request,getQueryString} from 'utils';
import { compose } from 'redux';
import {connect} from 'react-redux';
import Stages from './Stages';
import { Form,  message, Row } from 'antd';



class Organization extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.value || [],
            prevData: props.data,
            loading: false,
            name_options: [],//角色名称选项
            type_options: [],//角色类型选项
            member_options: [],//角色成员选项
            stages_options: [],//分期项目选项
        };
    }
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                data: nextProps.value,
            });
        }
    }

    onChange = (data)=>{
    }

    componentWillMount(){
        let id = getQueryString('id')
        let url = '/biz/itemsorganzation/findEditData'
        request(url, {
            params:{
                company_id: this.props.company_id,
                items_id: id
            }
        }).then((data) => {
            if(data.state === 'ok'){
                console.log(data);
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



    render() {
        const { data,name_options,type_options,member_options } = this.state;
        let id = getQueryString('id')
        const { getFieldDecorator } = this.props.form;
        return (
            <React.Fragment>
                <Form>
                {
                    this.state.stages_options.length > 0 ?
                        this.state.stages_options.map((item,index)=>{
                            return (
                                <div style = {{marginBottom:20}} key={item.key}>
                                    <Row>
                                        <h2 style={{marginLeft:30}}>{item.label}</h2>
                                    </Row>
                                    {getFieldDecorator(`members${index}`, {
                                        initialValue: data,
                                    })(
                                        <Stages
                                            data={data}
                                            name_options={name_options}
                                            type_options={type_options}
                                            member_options={member_options}
                                            stages_id={item.key}
                                        />
                                    )}

                                </div>
                            )
                        })
                        :
                        <div>
                            {getFieldDecorator('members', {
                                initialValue: data,
                            })(
                                <Stages
                                    data={data}
                                    name_options={name_options}
                                    type_options={type_options}
                                    member_options={member_options}
                                />
                            )}

                        </div>
                }
                </Form>
            </React.Fragment>
        );
    }
}

const enhance = compose(
    connect(state=>({
        company_id:state.user.getIn(['personal','company_id'])
    })),
    Form.create()
)
export default enhance(Organization);