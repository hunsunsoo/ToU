import React from "react";
import { ResponsivePie } from "@nivo/pie";
import styled from "styled-components";
import { BiDoughnutChart } from 'react-icons/bi';

const data = [
  {
    id: "rust",
    label: "rust",
    value: 311,
    color: "hsl(103, 70%, 50%)",
  },
  {
    id: "java",
    label: "java",
    value: 41,
    color: "hsl(244, 70%, 50%)",
  },
  {
    id: "stylus",
    label: "stylus",
    value: 492,
    color: "hsl(93, 70%, 50%)",
  },
  {
    id: "hack",
    label: "hack",
    value: 19,
    color: "hsl(238, 70%, 50%)",
  },
  {
    id: "erlang",
    label: "erlang",
    value: 197,
    color: "hsl(80, 70%, 50%)",
  },
];

const OfficerChart = () => {
  return (
    <StyledContainer>
      <StyledTitle>
        <BiDoughnutChart
          color="#545A96"
          size={"30px"}
          style={{ marginRight: "10px" }}
        />
        업체별 거래 횟수
      </StyledTitle>

      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
        sortByValue={true}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={4}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ theme: "background" }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "ruby",
            },
            id: "dots",
          },
          {
            match: {
              id: "c",
            },
            id: "dots",
          },
          {
            match: {
              id: "go",
            },
            id: "dots",
          },
          {
            match: {
              id: "python",
            },
            id: "dots",
          },
          {
            match: {
              id: "scala",
            },
            id: "lines",
          },
          {
            match: {
              id: "lisp",
            },
            id: "lines",
          },
          {
            match: {
              id: "elixir",
            },
            id: "lines",
          },
          {
            match: {
              id: "javascript",
            },
            id: "lines",
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 45,
            itemsSpacing: 0,
            itemWidth: 70,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "top-to-bottom",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </StyledContainer>
  );
};

export default OfficerChart;

const StyledContainer = styled.div`
  width: 100%;
  border: 1px solid black;
  border-radius: 30px;
  margin: 20px 0 20px 20px;
  padding: 20px;
`;

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #545A96;
`