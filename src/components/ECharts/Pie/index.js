// Created by liuliyuan on 2018/6/25

import React,{PureComponent} from 'react'
import echarts from 'echarts/lib/echarts' //必须
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/pie'

export default class PieReact extends PureComponent {

    constructor(props) {
        super(props)
        this.state={
            option:props.option
        }
        this.onResize = this.onResize.bind(this)
    }

    componentDidMount(){
        if(this.state.option){
            setTimeout(()=>{
                this.onResize(this.state.option)
            },200)

            window.addEventListener('resize',this.onResize)
        }
    }

    componentWillUnmount(){
        window.removeEventListener('resize',this.onResize)
        //this.onResize = undefined;
    }

    componentWillReceiveProps(nextProps) {
        if ('option' in nextProps) {
            this.setState({
                option: nextProps.option,
            },()=>{
                this.onResize(nextProps.option)
            });
        }
    }

    onResize=(option)=>{
        //const { option={} } = this.props //外部传入的data数据
        let myChart = echarts.init(this.pie) //初始化echarts
        //设置options
        myChart.setOption(option)
        myChart.resize()
    }

    render() {
        return <div ref={p => this.pie = p} style={{width: "100%", height: "200px"}}></div>
    }
}

