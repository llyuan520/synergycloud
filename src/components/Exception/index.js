// Created by liuliyuan on 2018/6/22
import React, { createElement } from 'react';
import { Button } from 'antd';
import config from './typeConfig';
import './styles.less';
//import styles from './styles.less';

export default ({ className='exception', linkElement = 'a', type, title, desc, img, actions, ...rest }) => {
    const pageType = type in config ? type : '404';
    return (
        <div className={className} {...rest}>
            <div className='imgBlock'>
                <div
                    className='imgEle'
                    style={{ backgroundImage: `url(${img || config[pageType].img})` }}
                />
            </div>
            <div className='content'>
                <h1>{title || config[pageType].title}</h1>
                <div className='desc'>{desc || config[pageType].desc}</div>
                <div className='actions'>
                    {actions ||
                    createElement(
                        linkElement,
                        {
                            to: '/',
                            href: '/',
                        },
                        <Button type="primary">返回首页</Button>
                    )}
                </div>
            </div>
        </div>
    );
};

/*
export default ({ className, linkElement = 'a', type, title, desc, img, actions, ...rest }) => {
    const pageType = type in config ? type : '404';
    const clsString = classNames(styles.exception, className);
    return (
        <div className={clsString} {...rest}>
            <div className={styles.imgBlock}>
                <div
                    className={styles.imgEle}
                    style={{ backgroundImage: `url(${img || config[pageType].img})` }}
                />
            </div>
            <div className={styles.content}>
                <h1>{title || config[pageType].title}</h1>
                <div className={styles.desc}>{desc || config[pageType].desc}</div>
                <div className={styles.actions}>
                    {actions ||
                    createElement(
                        linkElement,
                        {
                            to: '/',
                            href: '/',
                        },
                        <Button type="primary">返回首页</Button>
                    )}
                </div>
            </div>
        </div>
    );
};*/
