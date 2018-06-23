// Created by liuliyuan on 2018/6/23
import * as React from 'react';

export default (props) => {
    return (
        <div className="home-dot-badge">
            {props.dotStyle && <i className={`home-dot`} style={props.dotStyle}/>}
            {props.text}
        </div>
    );
};