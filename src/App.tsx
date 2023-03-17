import Header from "./components/Header"
import About from "./components/About"
import InputForm from "./components/InputForm"
import Results from "./components/Results"
import Footer from "./components/Footer"
function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <div className="inputPanel">
          <About />
          <InputForm />
        </div>
        <div className="resultPanel">
          <Results />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
