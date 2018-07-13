// created by Lee in 2018/07/11

import React,{Component} from 'react'
import Projetinfo from '../ProjectUtil/Projectinfo'


const tableData=[]
class tab1Edit extends Component{
    constructor(){
        super();
        this.state = {
            edit:true
        }
    }

    componentWillMount(){
        // console.log(this.props.data);
        // console.log(this.props);

    }

    render(){
        const data = this.props.data;
        return (
            <Projetinfo edit={this.state.edit} form={this.props.form} tableData = {tableData}  data={data} />
        )
    }
}

export default tab1Edit;