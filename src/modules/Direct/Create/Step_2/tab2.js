// Created by liuliyuan on 2018/7/2
import React,{Component} from 'react'
import { Card,Row,Alert,Button } from 'antd';
import TableForm from './TableForm.r'
import PopModal from './PopModal'


class TabPane2 extends Component {

    state={
        updateKey:Date.now(),
        visible:false,
        modalConfig:{
            type:''
        },
        item:{
            supplier_id:{},
            dataList:[
                {
                    accountability_reason
                        :
                        "asdf",
                    hide_des
                        :
                        "阿斯蒂芬萨达发是的",
                    id
                        :
                        "465153599844909056",
                    is_accountability
                        :
                        "1",
                    is_hide
                        :
                        "1",
                    is_rework
                        :
                        "1",
                    item
                        :
                        "变更1",
                    planDateEnd
                        :
                        "2018-07-07",
                    planDateStart
                        :
                        "2018-07-06",
                    rework_des
                        :
                        "阿萨德法师的方法",
                    seq
                        :
                        1
                },
                {
                    accountability_reason
                        :
                        "asdf",
                    hide_des
                        :
                        "阿斯蒂芬萨达发",
                    id
                        :
                        "465153599844909057",
                    is_accountability
                        :
                        "1",
                    is_hide
                        :
                        "1",
                    is_rework
                        :
                        "0",
                    item
                        :
                        "变更2",
                    planDateEnd
                        :
                        "2018-08-21",
                    planDateStart
                        :
                        "2018-07-11",
                    rework_des
                        :
                        "",
                    seq
                        :
                        2
                }

            ],
        },

    }

    setDataList = dataList =>{
        this.mounted && this.setState({
            item:{
                supplier_id:dataList.supplier_id,
                dataList:dataList.newData,
            }
        },()=>{
            console.log(this.state.item, this.state.item.dataList)
        })
    }
    toggleModalVisible=visible=>{
        this.setState({
            visible
        })
    }

    showModal=type=>{
        this.toggleModalVisible(true)
        this.setState({
            modalConfig:{
                type,
                id:this.state.selectedRowKeys,
            }
        })
    }
    mounted=true
    componentWillUnmount(){
        this.mounted=null
    }
    render(){

        const { visible,modalConfig,item } = this.state;
        const { form,display,model,data } = this.props;
        const { getFieldDecorator, getFieldError } = form;
        const dataListError = getFieldError('dataList');
        return(
            <React.Fragment>

                    <Card
                        bordered={false}
                        bodyStyle={{
                            paddingTop:0
                        }}
                    >

                        <Row gutter={24} style={{margin:'14px 12px 0'}}>
                            {getFieldDecorator('dataList', {
                                initialValue: item.dataList,
                                rules:[
                                    {
                                        required:true,
                                        message:'请选择供应商'
                                    }
                                ]
                            })(<TableForm form={form} />)}
                            {
                                dataListError ? <Alert key='errorMsg' message={dataListError.join(',')} type="error" /> : null
                            }

                        </Row>


                        {
                            !display && <Button
                                style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
                                type="dashed"
                                onClick={()=>this.showModal('add')}
                                icon="plus"
                            >
                                指定供应商
                            </Button>
                        }

                    </Card>

                <PopModal
                    visible={visible}
                    modalConfig={modalConfig}
                    toggleModalVisible={this.toggleModalVisible}
                    model={model}
                    data={data}
                    setDataList={this.setDataList.bind(this)}
                />
            </React.Fragment>
        )
    }

}

export default TabPane2