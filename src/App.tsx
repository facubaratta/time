import DailyLifeBar from "./components/daily/DailyLifeBar";
import DailyTime from "./components/daily/DailyTime";
import LifeProgress from "./components/life/LifeProgress";
import LifeSettings from "./components/life/LifeSettings";
import LifeStats from "./components/stats/LifeStats";
import TimePeriods from "./components/time/TimePeriods";

function App() {
  return (
    <main
      className="app-shell"
      style={{
        paddingBottom: "max(40px, env(safe-area-inset-bottom))",
      }}
    >
      <header className="site-header">
        <div className="site-kicker">
          <span>Personal time atlas</span>
          <span aria-hidden="true">TM—01</span>
        </div>
        <h1>
          Time{" "}
          <span>Magnitude</span>
        </h1>
        <p>
          See the scale of time—from the hour in front of you to the decades
          that make a life.
        </p>
        <TimePeriods />
      </header>
      <LifeSettings />
      <DailyTime />
      <LifeProgress />
      <DailyLifeBar />
      <LifeStats />
    </main>
  );
}

export default App;
