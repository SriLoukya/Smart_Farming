import React, { useState, Component, useEffect } from 'react';
import Plotly from 'plotly.js-dist';
import Plot from 'react-plotly.js';

const Compare = () => {
    var plot1 = {
        x: ["Microwave", "Washing Machine", "Tv", "Vacuum Cleaner", "Hair Dryer"],
        y: [4, 5, 6, 1, 4],
        name: "2016",
        type: "bar",
    };

    var plot2 = {
        x: ["Microwave", "Washing Machine", "Tv", "Vacuum Cleaner", "Hair Dryer"],
        y: [12, 3, 5, 6, 2],
        name: "2017",
        type: "bar",
    };

    var data = [plot1, plot2];

    const rendergraph = () => {
        return (
            <Plot
                data={data}
                layout={{ width: 500, height: 500, title: 'Electronics Prices 2016/2017' }} />
        )
    }


    return (
        <div style={{ background: 'black', height: "100vh", color: 'aqua' }}>
            {rendergraph()}
      

        </div>
    )

}
export default Compare;