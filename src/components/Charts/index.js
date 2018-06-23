// Created by liuliyuan on 2018/6/23
import numeral from 'numeral';
import './g2';
import Pie from './Pie';
const yuan = val => `&yen; ${numeral(val).format('0,0')}`;

export {
    yuan,
    Pie,
};
