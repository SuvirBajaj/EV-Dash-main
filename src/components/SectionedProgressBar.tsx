import React from 'react';
import { ProgressBarSection } from './ProgressBarSection';

export interface SectionedProgressBarPropsI {
    sectionColors:string[];
    sectionSizes:number[];
    width:number;
    height:number;
    percent:number;
}

export const SectionedProgressBar = (props:SectionedProgressBarPropsI) => {
    let percentLeft = props.percent;
    const sections = props.sectionColors.map((color, i) => {
        let thisSectionPercent = (percentLeft > props.sectionSizes[i] ? 100 : (percentLeft/props.sectionSizes[i])*100);
        percentLeft = (percentLeft < props.sectionSizes[i] ? 0 : percentLeft - props.sectionSizes[i]);
        return <ProgressBarSection key={i} height={props.height} width={(props.sectionSizes[i]/100)*props.width} color={props.sectionColors[i]} fillPercent={thisSectionPercent}/>
    });
    return <div style={{width: props.width, border: "2px lightgray solid",display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "left"}}>{sections}</div>;
}