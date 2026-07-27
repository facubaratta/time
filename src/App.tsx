import LifeSection from "./components/life/LifeSection";
import TimePeriods from "./components/time/TimePeriods";

function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <h1 className="app-title">TIME LEFT ⏳</h1>
      </header>
      <TimePeriods />
      <LifeSection />
    </main>
  );
}

export default App;
