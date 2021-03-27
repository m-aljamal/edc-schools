import React from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";

const BarCart = ({ title, dataArray, type }) => {
  const labels = dataArray.map((sub) => sub._id[type]);
  const data = dataArray.map((sub) => sub.total);

  const barData = {
    labels: labels,

    datasets: [
      {
        data: data,
        stack: 5,
        backgroundColor: [
          "rgba(54, 162, 235,0.3)",
          "rgba(255, 99, 132,0.3)",
          "rgba(239, 121, 0,0.3)",
          "rgba(61, 92, 5,0.3)",
          "rgba(0, 44, 240,0.3)",
          "rgba(216, 99, 251,0.3)",
          "rgba(248, 60, 60,0.3)",
          "rgba(250, 227, 16,0.3)",
          "rgba(159, 243, 156,0.3)",
          "rgba(75, 130, 167,0.3)",
          "rgba(174, 150, 230,0.3)",
        ],
      },
    ],
  };
  return (
    <BarStyle>
      <p>{title}:</p>
      <Bar
        data={barData}
        options={{
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  precision: 0,
                },
              },
            ],
          },
        }}
      />
    </BarStyle>
  );
};

export default BarCart;

const BarStyle = styled.div`
  box-shadow: var(--bs);
  padding: 20px;
`;
