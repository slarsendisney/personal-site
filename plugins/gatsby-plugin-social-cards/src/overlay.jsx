import React from "react";

function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Overlay = ({ title, tags, type, timeToRead, noMeta }) => {
  const largeText = noMeta ? true : title.length > 32;
  const xlText = noMeta && title.length <12
  const iwidth = 1200;
  const iheight = 630;
  const xMargin = 60;
  const textArray = title
    ? largeText
      ? title.match(/.{1,23}(\s|$)/g)
      : title.match(/.{1,16}(\s|$)/g)
    : [];
  const tagsString = tags
    ? tags.reduce(
        (text, value, i, array) =>
          i > 0
            ? text + (i < array.length - 1 ? ", " : " & ") + jsUcfirst(value)
            : jsUcfirst(value),
        ""
      )
    : [];
  const tagsArray = tagsString.match(/.{1,32}(\s|$)/g);
  let texty = 180 - (textArray.length - 1) * (largeText ? 24 : 30);
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
        <text
          fontWeight="bold"
          fill="#444444"
          fontSize={xlText?"130":largeText ? "60" : "75"}
          y={texty}
        >
          {textArray &&
            textArray.map((line, index) => (
              <tspan
                x={xMargin}
                dy={index > 0 ? (largeText ? 65 : 75) : 0}
                key={line}
              >
                {line}
              </tspan>
            ))}
          {noMeta &&
              <>
                <tspan
                  fontSize="30"
                  fontWeight="semibold"
                  fill="#44444480"
                  x={xMargin}
                  dy={xlText?65:50}
                >
                  The Portfolio of Sam Larsen-Disney
                </tspan>
              </>
          }
          {!noMeta &&
            tagsArray &&
            tagsArray.map((line, index) => (
              <tspan
                key={line}
                fontSize="35"
                fontWeight="semibold"
                fill="#44444480"
                x={xMargin + (index > 0 ? 0 : 45)}
                dy={50}
              >
                {line}
              </tspan>
            ))}
          {!noMeta && type === "Article" && (
            <tspan
              fontSize="35"
              fontWeight="semibold"
              fill="#44444480"
              x={xMargin + 45}
              dy={50}
            >
              {timeToRead} minute read
            </tspan>
          )}
        </text>
        {!noMeta && (
          <svg
            y={texty + 22 + (textArray.length - 1) * (largeText ? 65 : 75)}
            x={xMargin}
            width="32px"
            height="32px"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="Artboard"
                transform="translate(-58.000000, -311.000000)"
                fill="#5368E0"
                fillRule="nonzero"
              >
                <g id="tag" transform="translate(58.000000, 311.000000)">
                  <path
                    d="M30.8571322,0 L18.2858565,0 C17.9827793,6.69624874e-05 17.6921573,0.120532477 17.4778738,0.3348794 L0.33519479,17.4772762 C-0.111385392,17.9233133 -0.111787173,18.6469099 0.334324264,19.0934828 C0.334592118,19.0937506 0.334926936,19.0940854 0.33519479,19.0943533 L12.9064704,31.6654219 C13.3527828,32.111526 14.0761904,32.111526 14.5224358,31.6654219 L31.6651148,14.5230252 C31.8797331,14.3084773 32.0002006,14.0173914 31.9999997,13.7139174 L31.9999997,1.14284877 C31.9999997,0.511660366 31.488331,0 30.8571322,0 Z M23.880597,10.5074627 C22.5617175,10.5074627 21.4925373,9.43828247 21.4925373,8.11940299 C21.4925373,6.8005235 22.5617175,5.73134328 23.880597,5.73134328 C25.1994765,5.73134328 26.2686567,6.8005235 26.2686567,8.11940299 C26.2686567,9.43828247 25.1994765,10.5074627 23.880597,10.5074627 Z"
                    id="Shape"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        )}
        {!noMeta && type === "Article" && tagsArray && (
          <svg
            y={
              texty +
              22 +
              (textArray.length - 1) * (largeText ? 65 : 75) +
              tagsArray.length * 50
            }
            x={xMargin}
            width="32px"
            height="32px"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="Artboard"
                transform="translate(-105.000000, -311.000000)"
                fill="#5368E0"
                fillRule="nonzero"
              >
                <g id="clock-(1)" transform="translate(105.000000, 311.000000)">
                  <path
                    d="M16,0 C7.17724613,0 0,7.17724613 0,16 C0,24.8227539 7.17724613,32 16,32 C24.8227539,32 32,24.8227539 32,16 C32,7.17724613 24.8227539,0 16,0 Z M23.609375,24.2758789 C23.3493652,24.5358887 23.0080566,24.6667481 22.6667481,24.6667481 C22.3254394,24.6667481 21.9838867,24.5358887 21.7241211,24.2758789 L15.0573731,17.609375 C14.8066406,17.3601074 14.6667481,17.0212403 14.6667481,16.6667481 L14.6667481,8 C14.6667481,7.26269531 15.263916,6.66674806 16,6.66674806 C16.736084,6.66674806 17.3332519,7.26269531 17.3332519,8 L17.3332519,16.1147461 L23.609375,22.390625 C24.1306152,22.9121094 24.1306152,23.7546387 23.609375,24.2758789 Z"
                    id="Shape"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        )}
      </g>
    </svg>
  );
};

export default Overlay;
