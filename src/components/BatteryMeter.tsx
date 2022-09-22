import React from 'react';
import { Stack, Box } from '@mui/material';

export interface BatteryMeterPropsI {
    height:number;
    width:number;
    percent:number;
    fontSize?:number;
}

export function BatteryMeter(props:BatteryMeterPropsI) {
    const styleTop = {width: (props.width*.5), height: (props.height*.05), backgroundColor: 'transparent', borderTop: "2px solid lightgray", borderRight: "2px solid lightgray", borderLeft: "2px solid lightgray"};
    const styleBottom = {width: (props.width), marginTop: (props.height*.95)*(1 - props.percent/100), height: (props.height*.95)*(props.percent/100), backgroundColor: '#00d60b', display: 'table', overflow: 'hidden'};
    const styleText = {display: 'table-cell', verticalAlign: 'middle', fontSize: (props.fontSize ? props.fontSize : 30), fontWeight: 'bold', color: 'white'}
    const styleBox = {border: "2px solid lightgray", width: props.width, height: props.height*.95};

    return  <Stack spacing={0} alignItems="center">
        <span id="battery-top" style={styleTop}/>
        <Box sx={styleBox}>
            <span id="battery-bottom" style={styleBottom}>
                <span id="text-container" style={styleText}>{props.percent}%</span>
            </span>
        </Box>
    </Stack>
}