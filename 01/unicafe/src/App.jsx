import { useState } from "react";

const Statisticsline = ({ text, value }) => {
  return (
    <>
      <td>
        {text} {value}
      </td>
    </>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total || 0;
  const positivePercentage = (good / total) * 100 || 0;

  if (total === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <table>
      <th style={{fontSize: "22px"}}>Statistics</th>
      <tr>
        <Statisticsline text="Good" value={good} />
      </tr>
      <tr>
        <Statisticsline text="Neutral" value={neutral} />
      </tr>
      <tr>
        <Statisticsline text="Bad" value={bad} />
      </tr>
      <tr>
        <Statisticsline text="Total" value={total} />
      </tr>
      <tr>
        <Statisticsline text="Average" value={average} />
      </tr>
      <tr>
        <Statisticsline text="Positive" value={positivePercentage + " %"} />
      </tr>
    </table>
  );
};
function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood((good) => good + 1)}>Good</button>
      <button onClick={() => setNeutral((neutral) => neutral + 1)}>
        Neutral
      </button>
      <button onClick={() => setBad((bad) => bad + 1)}>Bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
}

export default App;
