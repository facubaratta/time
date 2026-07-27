import DailyTime from "./components/daily/DailyTime";
import LifeSection from "./components/life/LifeSection";
import TimePeriods from "./components/time/TimePeriods";

function App() {
  return (
    <main
      className="app-shell"
      style={{
        width: "100%",
        paddingBottom: "max(40px, env(safe-area-inset-bottom))",
      }}
    >
      <TimePeriods />
      <LifeSection />
      <DailyTime />
    </main>
  );
}

export default App;
