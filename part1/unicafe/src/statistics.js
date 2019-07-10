import React from "react";
import "./statistics.css";

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <th scope="row">{text}</th>
      <td>{value}</td>
    </tr>
  );
};

export const Statistics = ({ stats }) => {
  const getAvgScore = () => {
    return ((stats[0].good - stats[2].bad) / total).toFixed(2);
  };

  const getPositivePercentage = () => {
    return ((stats[0].good / total) * 100).toFixed(2);
  };

  let total = 0;
  const statsArr = stats.map(item => {
    let [key, value] = Object.entries(item)[0];
    total += value;
    return <Statistic key={key} text={key} value={value} />;
  });

  let statElements = (
    <>
      {statsArr}
      <Statistic text="all" value={total} />
      <Statistic text="avg" value={getAvgScore()} />
      <Statistic text="positive" value={getPositivePercentage()} />
    </>
  );

  return (
    <table id="stat">
      <caption>
        <strong>Statistics</strong>
      </caption>
      <tbody>
        {total === 0 ? (
          <tr>
            <td>No feedback given</td>
          </tr>
        ) : (
          statElements
        )}
      </tbody>
    </table>
  );
};
