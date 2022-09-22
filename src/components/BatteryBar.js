import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const BatteryBar = (props) => {
    const {battery} = props;

    const calcColor = (percent, start, end) => {
        let a = percent / 100,
        b = (end - start) * a,
        c = b + start;

        return "hsl(" + c + ", 100%, 50%)";
    }
    return (
        <CircularProgressbar
            value={battery}
            text={`${battery}%`}
            circleRatio={0.75}
            styles={buildStyles({
                rotation: 1 / 2 + 1 / 8,
                strokeLinecap: "butt",
                trailColor: "#eee",
                stroke: calcColor(value, 0, 120),
            })}
      />
    );
};

export default BatteryBar