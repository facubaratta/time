import DailyLifeBar from "./components/daily/DailyLifeBar";
import DailyTime from "./components/daily/DailyTime";
import LifeProgress from "./components/life/LifeProgress";
import LifeSettings from "./components/life/LifeSettings";
import LifeStats from "./components/stats/LifeStats";
import TimePeriods from "./components/time/TimePeriods";

function App() {
  return (
    <main id="top" className="app-shell">
      <header className="site-header">
        <div className="site-meta">
          <span>Personal time atlas</span>
          <span aria-hidden="true">TM—01</span>
        </div>
        <h1>
          Time
          <span>Magnitude</span>
        </h1>
        <p>
          A scale model of the time in front of you, from the current day to a
          complete lifetime.
        </p>
        <TimePeriods />
      </header>
      <LifeSettings />
      <DailyTime />
      <LifeProgress />
      <DailyLifeBar />
      <LifeStats />
      <footer className="site-footer">
        <span>Time Magnitude</span>
        <a href="#top">Return to top</a>
      </footer>
    </main>
  );
}

export default App;
