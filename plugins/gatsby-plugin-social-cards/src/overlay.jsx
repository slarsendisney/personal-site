import React from "react";

const Overlay = ({
  title = "",
}) => {
  const iwidth = 1200;
  const iheight = 630;
  const xMargin = 50;
  const textArray = title.match(/.{1,17}(\s|$)/g)
  let texty = 250 - ((textArray.length-1)*30);
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1200"
      height="630"
      viewBox={`0 0 ${iwidth} ${iheight}`} 
      fontFamily="Helvetica, Arial, sans-serif"
    >
       <g>
        <text fontWeight="bold" fill="#444444" fontSize="75"  y={texty}>
          {textArray.map((line, index) => <tspan x={xMargin} dy={index>0?75:0}>{line}</tspan>)}
        </text>
       </g>
        
   
    </svg>
  );
};

export default Overlay;
