// Created by liuliyuan on 2018/7/10
import React from 'react';
import classNames from 'classnames';
import { Row } from 'antd';
import './styles.less'

export default ({
                    className,
                    title,
                    col = 3,
                    layout = 'horizontal',
                    gutter = 32,
                    children,
                    size,
                    ...restProps
                }) => {
    const clsString = classNames('descriptionList', [layout], className, {
        'small': size === 'small',
        'large': size === 'large',
    });
    const column = col > 4 ? 4 : col;
    return (
        <div className={clsString} {...restProps}>
            {title ? <div className='title'>{title}</div> : null}
            <Row gutter={gutter}>
                {React.Children.map(children, child => React.cloneElement(child, { column }))}
            </Row>
        </div>
    );
};
