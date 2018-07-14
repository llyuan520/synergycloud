// Created by liuliyuan on 2018/6/30
import React, {Component} from 'react'
import {Form, Select, Spin, message} from 'antd'
import PropTypes from 'prop-types'
import {request} from 'utils'
import debounce from 'lodash/debounce'

const FormItem = Form.Item;
const Option = Select.Option
export default class AsyncSelect extends Component {
    static propTypes = {
        form: PropTypes.object.isRequired,
        formItemStyle: PropTypes.object,
        fieldName: PropTypes.string,
        initialValue: PropTypes.any,
        fieldTextName: PropTypes.string.isRequired,
        fieldValueName: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        params: PropTypes.object,
        selectOptions: PropTypes.object,
        doNotFetchDidMount: PropTypes.bool,
        decoratorOptions: PropTypes.object,

        //外部条件，用来提供给外部控制该组件是否要异步获取信息的条件，可选
        fetchAble: PropTypes.any,

        transformData: PropTypes.func
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
        label: 'field',
        selectOptions: {},
        doNotFetchDidMount: false,
        decoratorOptions: {},
        fetchAble: true,

        transformData: data => data
    }

    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            loaded: props.doNotFetchDidMount
        }
        this.onSearch = debounce(this.onSearch, 300)
    }

    mounted = true

    componentWillUnmount() {
        this.mounted = null;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.url !== nextProps.url) {
            if (nextProps.fetchAble) {
                this.fetch(nextProps.url)
            }
            if (!nextProps.decoratorOptions.initialValue) {
                nextProps.form.resetFields([nextProps.fieldName])
                this.setState({
                    dataSource: []
                })
            }

        }
    }

    componentDidMount() {
        !this.props.doNotFetchDidMount && this.fetch()
    }

    toggleLoaded = loaded => {
        this.setState({
            loaded
        })
    }

    fetch(url) {
        this.toggleLoaded(false)
        request(url || this.props.url)
        .then((res) => {
            console.log(res);
            if (res.state === 'ok' && this.mounted) {
                this.toggleLoaded(true)
                const result = res.data;
                this.setState({
                    dataSource: this.props.transformData(result)
                })
            } else {
                return Promise.reject(res.message);
            }
        })
        .catch(err => {
            message.error(err.message)
        })
    }

    onSearch = (value) => {
        const {selectOptions: {showSearch}, customValues, searchType} = this.props;
        if (showSearch) {

            if (searchType === 'itemName') {
                //项目名称
                request(`/project/listByName`, {
                    params: {
                        mainId: customValues.mainId,
                        itemName: value,
                        size: 100
                    }
                })
                .then((res) => {
                    if (res.state === 'ok') {
                        const result = res.data.records;
                        this.setState({
                            dataSource: result
                        })

                    } else {
                        return Promise.reject(res.message);
                    }
                })
                .catch(err => {
                    message.error(err.message)
                });
            }
            /*else{
                         this.fetch(undefined,{
                         name:value,
                         })
                         }*/

        }
    }
    // onChange=(value)=>{
    //     const { selectOptions:{ showSearch }, searchType } = this.props;
    //     // 当选中某条数据后，查询条件清空，将所有数据获取出来（缺点：如果用户想选择查询出来的数据中的多条就没办法了） 后期调研下searchType!=='itemName'
    //     if(showSearch && searchType!=='itemName'){
    //         this.fetch()
    //     }
    // }
    render() {
        const {dataSource, loaded} = this.state;
        console.log(dataSource);
        const {getFieldDecorator} = this.props.form;
        const {formItemStyle, fieldName, initialValues, fieldTextName, fieldValueName, label, hideLabel, selectOptions, decoratorOptions} = this.props;
        return (
        <Spin spinning={!loaded}>
            <FormItem label={hideLabel !== true && label} {...formItemStyle}>
                {getFieldDecorator(fieldName, {
                    initialValue: initialValues,
                    ...decoratorOptions
                })(
                <Select
                style={{width: '100%'}}
                onSearch={this.onSearch}
                // onChange={this.onChange}
                placeholder={`请选择${label}`}
                {...selectOptions}
                >
                    {
                        dataSource && dataSource.map((item, i) => (
                        <Option key={i} value={item[fieldValueName]}>{item[fieldTextName]}</Option>
                        ))
                    }
                </Select>
                )}
            </FormItem>
        </Spin>
        )
    }
}