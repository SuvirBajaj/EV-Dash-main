import React from "react";
import { MAX_DRAW_KW } from "../constants";
import { SectionedProgressBar } from "./SectionedProgressBar";

export interface CurrentDrawBarPropsI {
    currentDraw: number;
}

export function CurrentDrawBar (props: CurrentDrawBarPropsI) {  
    const progress:number = 100*(props.currentDraw/MAX_DRAW_KW);
    return (<>
        <SectionedProgressBar width={800} height={50} percent={progress} sectionColors={["#00d60b", "#d6ba00", "#d65600", "#d60000"]} sectionSizes={[60,20,15,5]}/>
    </>);
    
}