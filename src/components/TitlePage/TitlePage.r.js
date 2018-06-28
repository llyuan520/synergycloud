// Created by liuliyuan on 2018/6/22
import React from 'react';
import DocumentTitle from 'react-document-title'
export default (title,Component) => props => <DocumentTitle title={`${title}`}>{<Component {...props}/>}</DocumentTitle>