// Created by liuliyuan on 2018/6/22
import React, { Component } from 'react';
import { Layout} from 'antd';
class Footer extends Component {
    render() {
        return (
            <Layout style={{
                justifyContent:'flex-end'
            }}>
                <footer style={{ textAlign: 'center',padding:'50px 0' }}>
                    ©Copyright 喜盈佳企业云服务有限公司 版权所有 粤ICP备44030502000290号号
                </footer>
            </Layout>
        );
    }
}
export default Footer;