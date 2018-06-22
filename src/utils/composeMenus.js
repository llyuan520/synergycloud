// Created by liuliyuan on 2018/6/22
export default function (routes) {
    return routes.map(item=>{
        if(item && !item.to && item.icon){
            return {
                name:item.name,
                icon:item.icon,
                path:item.path
            }
        }
        return null;
    }).filter(item=>item);
}