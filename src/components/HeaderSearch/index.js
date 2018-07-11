// Created by liuliyuan on 2018/7/11
import React, { PureComponent } from 'react';
import {withRouter} from 'react-router-dom'
import { compose } from 'redux';
import {connect} from 'react-redux';
import { Form } from 'antd';
import {getFields} from 'utils'
import {saveCompanyId} from '../../ducks/user'
import './styles.less';

class HeaderSearch extends PureComponent {

    state = {

    };

    mounted = true;
    componentWillUnmount(){
        this.mounted = null;
    }
    handleCompanyChange = (value) => {
        const { saveCompanyId } = this.props;
        this.mounted && this.setState({
            value
        },()=>{
            saveCompanyId(value);
            if(this.mounted && saveCompanyId !== this.props.companyId){
                this.props.history.replace('/web');
            }
        });
    }

    render() {
        return (
            <span className='headerSearch'>
                {
                    getFields(this.props.form,[
                        {
                            label:'企业名称',
                            fieldName:'company_id',
                            type:'asyncSelect',
                            span:24,
                            hideLabel:true,
                            componentProps:{
                                fieldTextName:'name',
                                fieldValueName:'id',
                                doNotFetchDidMount:false,
                                notShowAll:true,
                                url:`/con/mdydirective/findCompanyByContract`,
                                selectOptions:{
                                    onChange:this.handleCompanyChange,
                                    defaultActiveFirstOption:true,
                                    showSearch:true,
                                    optionFilterProp:'children',
                                },
                            },
                            fieldDecoratorOptions: {
                                //initialValue: this.props.areaId
                            }
                        }
                    ])
                }
            </span>
        );
    }
}

const enhance = compose(
    connect(state=>({
        companyId:state.user.getIn(['personal','companyId']),
    }),dispatch=>({
        saveCompanyId:saveCompanyId,
    })),
    Form.create()
)
export default withRouter(enhance(HeaderSearch));