import {useState} from "react";


function randomNumber(n) {
    return Math.floor(Math.random() * n);
}

function randomColor() {
    return `rgb(${randomNumber(255)}, ${randomNumber(255)}, ${randomNumber(255)})`
}

function App() {

    const [colors, setColors] = useState([randomColor(), randomColor(), randomColor()])
    const [correctPlace, setCorrectPlace] = useState(randomNumber(3));
    const [result, setResult] = useState(null)
    const [stats, setStats] = useState({total: 0, correct: 0})
    const [hint, setHint] = useState(false)

    const makeMove = guess => {
        if (guess === correctPlace) {
            setResult(<div className="success">Угадал!!</div>);
            setStats({total: stats.total + 1, correct: stats.correct + 1})
        } else {
            setResult(<div className="failure">Неправильно :(</div>);
            setStats({total: stats.total + 1, correct: stats.correct})

        }
        next();
    }

    const next = () => {
        setColors([randomColor(), randomColor(), randomColor()])
        setCorrectPlace(randomNumber(3))
    }

    const Button = ({optionNumber}) => <button type="button"
                                               style={{outline: hint && optionNumber === correctPlace ? '1px solid green' : 'none'}}
                                               onClick={() => makeMove(optionNumber)}>{colors[optionNumber]}</button>

    const Hint = () => <div className="hint">
        <input type="checkbox" checked={hint} onClick={() => setHint(v => !v)}/>Подсказочка
    </div>


    return (
        <>
            <Hint/>
            <div className="color-box" style={{backgroundColor: colors[correctPlace]}}></div>
            <div>
                <Button optionNumber={0}>{colors[0]}</Button>
                <Button optionNumber={1}>{colors[2]}</Button>
                <Button optionNumber={2}>{colors[2]}</Button>
            </div>
            {result}
            <div>Ваша статистика: {stats.correct / stats.total * 100}%</div>
            <div>Всего игр: {stats.total}</div>
        </>
    )
}

export default App