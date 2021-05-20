import React from 'react';
import Plot from 'react-plotly.js';

const Detail = (props) => {
  if (props.graph.xvalue) {
    return (
      <div>
        <Plot
          data={
            [
              {
                x: props.graph.xvalue,
                y: props.graph.yvalue,
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'black' },
              }
            ]}
          layout={
            {
              width: 1300,
              height: 600,
            }}
        />
      </div>
    )
  } else {
    return (
      <div>Loading</div>
    )
  }


}

export default Detail;