import Header from "./components/Header"
import About from "./components/About"
import InputForm from "./components/InputForm"
import Results from "./components/Results"
import Footer from "./components/Footer"
import { useState } from "react"

export type ResultsType = {
  network: Uint8Array,
  broadcast: Uint8Array,
  minHost: Uint8Array,
  maxHost: Uint8Array,
  hostsInNetwork: number;
}
function App() {
  const [result, setResult] = useState<ResultsType>();

  return (
    <div className="App">
      <Header />
      <main>
        <div className="inputPanel">
          <About />
          <InputForm setResult={setResult} />
        </div>
        <div className="resultPanel">
          <Results result={result} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
