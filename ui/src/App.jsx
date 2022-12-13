import { useState } from 'react'
import './App.css'
import Links from './components/Links.jsx'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <Links cnt={count}></Links>
      <h1>快速评教的方法</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          <a href="/hitwh-eval.zip">点此下载压缩包</a>
        </button>
        <p>
          先看<code>README.MD</code>!
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
