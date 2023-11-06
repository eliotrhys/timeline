"use client"
import DotItem from "@/app/types/DotItem";
import { use, useEffect, useRef, useState } from "react";

interface TimelineProps {
    innerTimelineWidth: number;
    dotItems: DotItem[];
    onInnerTimelineWidthUpdate: (innerTimelineWidth: number) => void;
    onDotSelect: (dotSelectIndex: number) => void;
}

export default function Timeline(props: TimelineProps) {
    
    const [seekHoverLeft, setSeekHoverLeft] = useState(160);
    const [seekbarStart, setSeekbarStart] = useState<number>();
    const [seekbarEnd, setSeekbarEnd] = useState<number>();
    const [seekbarStartAdded, setSeekbarStartAdded] = useState(false);
    const [seekbarEndAdded, setSeekbarEndAdded] = useState(false);

    const innerTimelineRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (innerTimelineRef.current) {
          const width = innerTimelineRef.current.clientWidth;
          props.onInnerTimelineWidthUpdate(width);
          console.log(width + " is the width");
        }
    }, []);

    const handleSeekHover = (e: React.MouseEvent<HTMLDivElement>) => {
        const seekAreaRect = e.currentTarget.getBoundingClientRect();
        const mousePositionX = e.clientX - seekAreaRect.left;

        setSeekHoverLeft(mousePositionX);
    };

    const handleSeekAreaClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const seekAreaRect = e.currentTarget.getBoundingClientRect();
        const clickPositionX = e.clientX - seekAreaRect.left;

        const seekbarStart = document.getElementById("seekbarStart")

        if (!seekbarStartAdded) 
        {
            
            // Add seekbarStart
            setSeekbarStartAdded(true);
            setSeekbarStart(clickPositionX); // Update the position of "seekbar" to the click position

            const seekbarStart = document.createElement("div");
            seekbarStart.id = "seekbarStart";
            seekbarStart.style.left = `${clickPositionX}px`;
            seekbarStart.classList.add("seekbar");
            e.currentTarget.appendChild(seekbarStart);
        } 
        else if (seekbarStartAdded && !seekbarEndAdded && seekbarStart !== null && clickPositionX > parseInt(seekbarStart.style.left)) 
        {
            const seekbarStart = document.getElementById("seekbarStart");
            // Add seekbarEnd
            setSeekbarEndAdded(true);
            setSeekbarEnd(clickPositionX); // Update the position of "seekbar" to the click position
            const seekbarEnd = document.createElement("div");
            seekbarEnd.id = "seekbarEnd";
            seekbarEnd.style.left = `${clickPositionX}px`;
            seekbarEnd.classList.add("seekbar");
            e.currentTarget.appendChild(seekbarEnd);
        }
        else if (seekbarStartAdded && seekbarEndAdded)
        {
            // const seekbarEnd = document.getElementById("seekbarEnd");
            console.log("DO NOTHING");
        }
    };

    // const handleResize = () => {
    //     setInnerTimelineWidth();
    // };
    
    // useEffect(() => {
    //     window.addEventListener("resize", handleResize);
    //     return () => {
    //       window.removeEventListener("resize", handleResize);
    //     };
    // }, [lineWidth, containerWidth]);

    const handleDotSelect = (index: number) => {
        props.onDotSelect(index);
    };

    return (
        <div id="timearea">
            <div id="timeline">

                <div id="seekarea"
                onMouseMove={handleSeekHover}
                onClick={handleSeekAreaClick}
                style={{ position: "relative" }}>
                    {/* <div id="inner-seekarea" style={{ width: "2050px", minWidth: "2550px" }}></div> */}
                    <div id="inner-seekarea" style={{ width: "100%" }}></div>
                    <div id="seekbarSelected"></div>
                    <div id="seek-hover" style={{ left: `${seekHoverLeft}px`, position: 'absolute' }}></div>
                </div>

                <div id="line-snap"></div>

                <div id="inner-timeline" ref={innerTimelineRef} style={{ width: `100%` }}>
                {/* <div id="inner-timeline" ref={innerTimelineRef} style={{ width: `${props.innerTimelineWidth}px` }}> */}

                    <div id="line">

                        { props.dotItems.map((dot, index) => (
                            <div
                                key={index}
                                className="dot"
                                style={{
                                position: "absolute",
                                left: `${50 * index + 50}px`,
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                                }}
                                onClick={() => handleDotSelect(index)}
                            ></div>
                        ))}

                    </div>

                </div>

            </div>
        </div>
    )
}