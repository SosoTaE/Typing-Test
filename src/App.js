import './App.css';
import {useEffect, useState} from "react"
import data from "./words.json"


function App() {
  const {words} = data
  const [word,setWord] = useState(words[Math.floor(Math.random() * words.length)])
  const _css = {
    "incorrect":"radial-gradient(rgb(36, 10, 63),rgb(40, 12, 18))",
    "correct": "radial-gradient(rgb(36, 10, 63),rgb(12, 40, 25))",
    "default":"radial-gradient(rgb(36, 10, 63),rgb(12, 12, 40))"
  }
  const [color,setColor] = useState("default")
  const [score,setScore] = useState(0)
  const [counter, setCounter] = useState(0)
  const [isStated, setIsStarted] = useState(false)
  const [isDone,setIsDone] = useState(false)
  const [size,setSize] = useState(window.innerWidth)
  const change = (arg) => {
    setIsStarted(true)
    let value = arg.target.value.trim()

    if (value.length === 0) {
      return setColor("default")
    }
    else if (value.length === word.length) {
      setCounter(counter + 1)
      if (value === word) {
        setScore(score + 1)
      }

      arg.target.value = ""
      setColor("default")
      return setWord(words[Math.floor(Math.random() * words.length)])
    }

    for (let i = 0;i < value.length;i++) {
      if (word[i] !== value[i]) {
        return setColor("incorrect")
      }

    }

    return setColor("correct")

  }

  const deviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
};

  useEffect(() => {
    window.addEventListener('resize', () => {
      setSize(window.innerWidth)
    })
   if (isStated) {
      let counter = 0;
      let timer = setInterval(() => {
        if (counter < 10) { 
          document.title = `Typing Test 0${counter}sec`
        }
        else {
          document.title = `Typing Test ${counter}sec`

        }
        if (counter === 60) {
          clearInterval(timer)
          setIsDone(true)
          setColor("default")
          document.title = `Typing Test`
        }
        counter++;
      }, 1000);
    }
  }, [isStated])

  if (deviceType() !== "desktop" || size < 510) {
    return(
      <div className="containerLikeBody" id="errorText" style={{color:'white', alignItems:"center"}}>
        დევაისის ზომა არ შეესაბამება კონტენტს
      </div>
    );
  }

  if (!isDone) {
     return (
      <div className="containerLikeBody" style={{background: _css[color]}}>
        <div className="container">
          <div className="wordContainer">
            <p className="word">{word}</p>
          </div>
          <div className="typeWord">
            <input type="text" className="input" placeholder={isStated ? "დაწერეთ მოცემული სიტყვა" : "დაწერეთ მოცემული სიტყვა დასაწყებად"} onChange={(arg) => change(arg)}></input>
          </div>
        </div>
      </div>
    );
  }

  return(
    <div className="containerLikeBody" style={{background: _css[color], alignItems:"center", flexDirection:"column"}}>
      <div className="results">
        <p>სიჩქარე: {score}WPS</p>
        <p>სიზუსტე: {(score/counter * 100).toString() === "NaN" ? 0 : Math.round(score/counter * 100)}%</p>
        <p>შეცდომა:{((counter - score) / counter * 100).toString() === "NaN" ? 0 : 100 - Math.round(score/counter * 100)}%</p>
      </div>
      <div className="button" onClick={() => {
        window.location.reload()
      }}>თავიდან დაწყება</div>
    </div>
  );

 
  
}

export default App;
