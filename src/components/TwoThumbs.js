import { Range, getTrackBackground } from "react-range";
import { useState } from "react";

const TwoThumbs = ({ rtl, priceMinMax, setPriceMinMax }) => {
  const [values, setValues] = useState(priceMinMax);

  const STEP = 5;
  const MIN = 0;
  const MAX = 500;
  return (
    <div className="price-range">
      <span>Trier entre : </span>
      <div className="range">
        <Range
          values={values}
          step={STEP}
          min={MIN}
          max={MAX}
          rtl={rtl}
          onChange={(values) => {
            setValues(values);
            let copy = [...values];
            setPriceMinMax(copy);
          }}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "30px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values,
                    colors: ["#ccc", "#2cb1ba", "#ccc"],
                    min: MIN,
                    max: MAX,
                    rtl,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "10px",
                width: "10px",
                borderRadius: "50%",
                backgroundColor: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA",
              }}
            >
              <div
                style={{
                  height: "10px",
                  width: "10px",
                  backgroundColor: isDragged ? "#2cb1ba" : "#fff",
                }}
              />
            </div>
          )}
        />
        <output id="output">
          <span>{`${values[0].toFixed(0)} € - ${values[1].toFixed(0)} €`}</span>
        </output>
      </div>
    </div>
  );
};

export default TwoThumbs;
