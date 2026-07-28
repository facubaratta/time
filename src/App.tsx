import DailyTime from "./components/daily/DailyTime";
import LifeSection from "./components/life/LifeSection";
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "var(--muted)",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          <span>Personal time atlas</span>
          <span aria-hidden="true">TM—01</span>
        </div>
        <h1>
          Time{" "}
          <span style={{ display: "block", color: "#858585" }}>Magnitude</span>
        </h1>
        <p>
          See the scale of time—from the hour in front of you to the decades
          that make a life.
        </p>
        <TimePeriods />
      </header>
      <DailyTime />
      <LifeSection />
    </main>
  );
}

export default App;
