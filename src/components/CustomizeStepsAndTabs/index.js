// Created by liuliyuan on 2018/7/4
import React,{Component} from 'react';
import {Switch,Route } from 'react-router-dom';
import {RouteWithSubRoutes} from 'components'
import Steps from '../Steps'
import './styles.less'

export default class CustomizeStepsAndTabs extends Component {

    render(){
        const { title, steps, routes } = this.props;
        const isShowSteps = steps && steps.steps && steps.steps.length > 0;
        return(
            <div className="ISA-fragment ISA-bgColor">
                <React.Fragment>
                    <h2> {title} </h2>
                    <div className="steps-main">
                        {
                            isShowSteps && <Steps {...steps} />
                        }
                        <div className="steps-content">
                            <Switch>
                                {routes.map((route, i) => (
                                    <RouteWithSubRoutes key={i} {...route}/>
                                ))}
                                <Route path="*" component={()=><div>no match</div>} />
                            </Switch>
                        </div>
                    </div>
                </React.Fragment>
            </div>
        )
    }
}