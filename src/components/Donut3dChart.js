import React, { useState, useEffect } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highcharts3d from "highcharts/highcharts-3d";
import { colors } from "./Colors";

highcharts3d(Highcharts);
const Donut3dChart = (props) => {

  const [categories, setCategories] = useState(null);
    //console.log(categories);
    useEffect(() => {
        setCategories(props.budgets[props.bindex].categories);
    });

    let grandTotal = 0;
    if (categories && categories.length > 0) {
        categories.map((category, index) => {
            if (category.category_type !== 'income') {
                let mothlyTotal = 0;
                category.items.map(item => {
                    mothlyTotal = mothlyTotal + ((item.is_active) ? Number(item.monthly) : 0)
                })
                categories[index].weekly = mothlyTotal / 4;
                categories[index].biweekly = mothlyTotal / 2;
                categories[index].monthly = mothlyTotal;
                categories[index].yearly = mothlyTotal * 12;
                grandTotal = grandTotal + categories[index].monthly;
            }
        })
    }

  Highcharts.setOptions({
    colors: [
      "#FFEA5D",
      "#97EE5B",
      "#5B8CFB",
      "#ED6559",
      "#B067FD",
      "#F5AE5E",
      "#5E5BF2",
      "#CC51A8",
    ],
  });
  var refinedData = [];
  categories &&
  categories.map((category, index) => {
    if (category.category_type !== 'income') {
        refinedData.push([
          `<span style='stroke-width:0;fill:#fff;font-size: 0.8rem; text-align: center'>${
            category.category_name
          }-<span style='fill: orange;'>${
            ((category.monthly / grandTotal) * 100).toFixed(2)
          }</span>: <span style='fill: #6AD7BB;'>${category.monthly}</span> </span>`,
          category.monthly,colors[index]
        ]);
      }
    });
  const options = {
    chart: {
      type: "pie",
      style: {
        fontFamily:
          '"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
      },
      backgroundColor: "#3b38d1",
      // plotOptions: {
      //   size: "100%",
      // },
      options3d: {
        enabled: true,
        alpha: 20,
      },
    },
    title: {
      text: `${props.budgets[props.bindex].name}' Typical <br>Monthly Budget <br><br><span style="font-size:1.6rem;fill:#22c9e4">$${((grandTotal)?(grandTotal).toFixed(2):0)}</span>`,
      widthAdjust: -360,
      align: "center",
      verticalAlign: "middle",
      y: ((grandTotal)?50:30),
      style: {
        color: "#fff", fontSize:18, fontWeight:"bold"
      },
    },
    subtitle: {
      text: `Summary of ${props.budgets[props.bindex].name} Monthly Budgeted Expences`,
      widthAdjust: "-10",
      style: { color: "#fff", fontSize: "1.7rem", fontWeight: "bolder"},
    },
    plotOptions: {
      pie: {
        depth: 100,
        innerSize: 250,
        // depth: 114,
        size: 340,
        startAngle: -65,
        dataLabels: { style: { fontSize: "14px" } },
      },
      series: { dataLabels: { color: "white" } },
    },
    series: [
      {
        name: "Value",
        data: refinedData,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Donut3dChart;
