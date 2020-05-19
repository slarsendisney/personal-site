import React from "react"

const iconSrcs = [
  "https://ik.imagekit.io/sld/js_escape_icons/numbers/0_DT2fr89nZ.svg",
  "https://ik.imagekit.io/sld/js_escape_icons/numbers/1_05Sl_5MLJrT.svg",
  "https://ik.imagekit.io/sld/js_escape_icons/numbers/2_u-lNqq7sJn.svg",
  "https://ik.imagekit.io/sld/js_escape_icons/numbers/3_C3yYbjqny.svg",
  "https://ik.imagekit.io/sld/js_escape_icons/numbers/4_IEHiTGQQj.svg",
  "https://ik.imagekit.io/sld/js_escape_icons/numbers/5_acYPNlSHy.svg",
  "https://ik.imagekit.io/sld/js_escape_icons/numbers/6_EXjsDuBThUgl.svg",
  "https://ik.imagekit.io/sld/js_escape_icons/numbers/7_P71qfRk2NVN.svg",
  "https://ik.imagekit.io/sld/js_escape_icons/numbers/8_xEwUyIvGxl.svg",
  "https://ik.imagekit.io/sld/js_escape_icons/numbers/9_9oFXGXlMem.svg",
]
export default ({ number, style, className }) => (
  <div className="flex">
    {number
      .toString()
      .split("")
      .map((item, index) => (
        <img
          src={iconSrcs[parseInt(item)]}
          style={{ ...style }}
          className={className}
        />
      ))}
  </div>
)
