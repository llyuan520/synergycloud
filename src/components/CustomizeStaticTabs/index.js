// Created by liuliyuan on 2018/7/4
import React,{Component} from 'react';
import CustomizeTabs from 'components/Tabs/index'
import './styles.less'

export default class CustomizeStaticTabs extends Component {

    render(){
        const { title , defaultActiveKey, tabPaneOptions, children, stepsAction } = this.props;
        return(
            <div className="ISA-fragment ISA-bgColor">
                <React.Fragment>
                    <h2> { title } </h2>
                    <div className="steps-main">
                        <div className="steps-content">
                            <CustomizeTabs
                                defaultActiveKey={ defaultActiveKey }
                                tabPaneOptions={ tabPaneOptions  }
                                children={ children }
                                stepsAction={ stepsAction }
                            />
                        </div>
                    </div>
                </React.Fragment>
            </div>
        )
    }
}