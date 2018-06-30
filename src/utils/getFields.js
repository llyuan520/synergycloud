// Created by liuliyuan on 2018/6/28
import React from 'react';
import {Col,Form,Input,DatePicker,Select,Checkbox,Cascader,Radio,Switch } from 'antd'
import { CusFormItem } from '../components'
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { RangePicker,MonthPicker } = DatePicker;

export const getFields = (form,fieldsData=[],layout) =>{

    const {getFieldDecorator,setFieldsValue,getFieldValue} = form;
   /* let topColResponsiveProps = {
        span:rowItemNumbers
    };
    switch (parseInt(rowItemNumbers, 0)){
        case 1:
            topColResponsiveProps ={ xs: 24, sm: 24, md: 24, lg: 24, xl: 24 };
            break;
        case 2:
            topColResponsiveProps ={ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 };
            break
        case 3:
            topColResponsiveProps ={ xs: 24, sm: 12, md: 8, lg: 8, xl: 8 };
            break
        case 4:
            topColResponsiveProps ={ xs: 24, sm: 12, md: 12, lg: 8, xl: 6 };
            break
        default:
            //break
    }*/

    let defaultFormItemStyle = layout === 'vertical' ? {} : {
        labelCol:{
            span:6
        },
        wrapperCol:{
            span:18
        }
    }
    if(typeof fieldsData === 'function'){
        /**
         * 当fieldsData为function的时候，必须要在最后返回fieldsData*/
        fieldsData = fieldsData(getFieldValue,setFieldsValue)
    }
    return fieldsData.map((item,i)=>{
        let CusComponent;
        const type = item.type;
        let formItemStyle = item.formItemStyle || defaultFormItemStyle;
        switch (type){
            case 'input':
                CusComponent = Input;
                break;
            case 'rangePicker' :
                CusComponent = RangePicker;
                break;
            case 'select':
                CusComponent = Select;
                break;
            case 'monthPicker':
                CusComponent = MonthPicker;
                break;
            case 'datePicker':
                CusComponent = DatePicker;
                break;
            case 'textArea':
                CusComponent = TextArea;
                break;
            case 'checkbox':
                CusComponent = Checkbox;
                break;
            case 'checkboxGroup':
                CusComponent = CheckboxGroup;
                break;
            case 'radio':
                CusComponent = Radio;
                break;
            case 'radioGroup':
                CusComponent = RadioGroup;
                break;
            case 'cascader':
                CusComponent = Cascader;
                break;
            case 'switch':
                CusComponent = Switch;
                break;
            case 'companyName':
                CusComponent = CusFormItem.CompanyName;
                break;
            case 'asyncSelect':
                CusComponent = CusFormItem.AsyncSelect;
                break;
            default:
                CusComponent = Input
        }

        if(type ==='companyName' || type === 'asyncSelect') {
            return (
                <Col span={item['span'] || 8} key={i}>
                    <CusComponent label={item['label']} fieldName={item['fieldName']}
                                  fieldDecoratorOptions={item.fieldDecoratorOptions}
                                  decoratorOptions={item.fieldDecoratorOptions} formItemStyle={formItemStyle}
                                  form={form} {...item['componentProps']} componentProps={item['componentProps']}/>
                </Col>
            )

        }else if(type==='select'){
            return (
                <Col span={item['span'] || 8} key={i}>
                    <FormItem label={ item['hideLabel'] === true ? null : item['label'] }  {...formItemStyle}>
                        {getFieldDecorator(item['fieldName'],{
                            ...item['fieldDecoratorOptions'],
                        })(
                            <CusComponent {...item['componentProps']} placeholder={`请选择${item['label']}`} >
                                {
                                    item.options.map((option,i)=>{
                                        return (
                                            <Option key={`option-${i}`} value={option.key}>{option.label}</Option>
                                        )
                                    })
                                }
                            </CusComponent>
                        )}
                    </FormItem>
                </Col>
            )
        }else if(type==='checkbox' || type==='radio'){
            return(
                <Col span={item['span'] || 8} key={i}>
                    <FormItem label={item['hideLabel'] === true ? null : item['label']} {...formItemStyle}>
                        {getFieldDecorator(item['fieldName'],{
                            valuePropName: type,
                            ...item['fieldDecoratorOptions']
                        })(
                            <CusComponent {...item['componentProps']} />
                        )}
                    </FormItem>
                </Col>
            )
        }else if(type==='checkboxGroup' || type==='cascader' || type==='radioGroup'){
            return(
                <Col span={item['span'] || 8} key={i}>
                    <FormItem label={item['hideLabel'] === true ? null : item['label']} {...formItemStyle}>
                        {getFieldDecorator(item['fieldName'],{
                            ...item['fieldDecoratorOptions'],
                        })(
                            <CusComponent {...item['componentProps']} placeholder={ (item['componentProps'] && item['componentProps'].placeholder) || `请选择${item['label']}` } options={item['options']} />
                        )}
                    </FormItem>
                </Col>
            )
        }else if(type==='rangePicker'){
            return (
                <Col span={item['span'] || 8} key={i}>
                    <FormItem label={item['hideLabel'] === true ? null : item['label']} {...formItemStyle}>
                        {getFieldDecorator(item['fieldName'],{
                            ...item['fieldDecoratorOptions']
                        })(
                            <CusComponent {...item['componentProps']} placeholder={ (item['componentProps'] && item['componentProps'].placeholder) || [`开始时间`,`结束时间`] } style={{width:'100%'}} />
                        )}
                    </FormItem>
                </Col>
            )
        }else if(type==='switch'){
            return (
                <Col span={item['span'] || 8} key={i}>
                    <FormItem label={item['hideLabel'] === true ? null : item['label']} {...formItemStyle}>
                        {getFieldDecorator(item['fieldName'],{
                            valuePropName: 'checked' ,
                            ...item['fieldDecoratorOptions']
                        })(
                            <CusComponent {...item['componentProps']} placeholder={ (item['componentProps'] && item['componentProps'].placeholder) || `请输入${item['label']}` } />
                        )}
                    </FormItem>
                </Col>
            )
        }else{
            return (
                <Col span={item['span'] || 8} key={i}>
                    <FormItem label={item['hideLabel'] === true ? null : item['label']} {...formItemStyle}>
                        {getFieldDecorator(item['fieldName'],{
                            ...item['fieldDecoratorOptions']
                        })(
                            <CusComponent {...item['componentProps']} placeholder={ (item['componentProps'] && item['componentProps'].placeholder) || `请输入${item['label']}` } style={{width:'100%'}} />
                        )}
                    </FormItem>
                </Col>
            )
        }

    })

}
