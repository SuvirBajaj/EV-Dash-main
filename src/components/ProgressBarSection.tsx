import React from 'react';

export interface ProgressBarSectionPropsI {
    width:number;
    height:number;
    color:string;
    fillPercent:number;
}

export const ProgressBarSection = (props:ProgressBarSectionPropsI) => {
    console.log(props.fillPercent/100);
    const style = {backgroundColor: props.color, width: props.width*(props.fillPercent/100), height: props.height};
    return <span style={style}></span>;
}