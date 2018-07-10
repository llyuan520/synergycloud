// Created by liuliyuan on 2018/7/10
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Col } from 'antd';
import responsive from './responsive.r';
import './styles.less'

const Description = ({ term, column, className, children, ...restProps }) => {
    const clsString = classNames('description', className);
    return (
        <Col className={clsString} {...responsive[column]} {...restProps}>
            {term && <div className='term'>{term}</div>}
            {children && <div className='detail'>{children}</div>}
        </Col>
    );
};

Description.defaultProps = {
    term: '',
};

Description.propTypes = {
    term: PropTypes.node,
};

export default Description;
