import React, { useState, Component } from "react"
import classes from "./Quiz.module.css"
import { ActiveQuiz } from "../../components/ActiveQuiz/ActiveQuiz"
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz"
import axios from "../../axios/axios-quiz"
import Loader from "../../components/UI/Loader/Loader"
import { useParams } from "react-router-dom"

// class Quiz extends Component {
//   state = {
//     results: {},
//     isFinished: false,
//     activeQuestion: 0,
//     answerState: null,
//     quiz: [],
//     loading: true,
//   }

//   onAnswerCLickHandler = (answerId) => {
//     console.log("answerId: ", answerId)
//     if (this.state.answerState) {
//       const key = Object.keys(this.state.answerState)[0]
//       if (this.state.answerState[key] === "success") {
//         return
//       }
//     }

//     const question = this.state.quiz[this.state.activeQuestion]
//     const results = this.state.results

//     if (question.rightAnswerId === answerId) {
//       if (!results[question.id]) {
//         results[question.id] = "success"
//       }
//       this.setState({
//         answerState: { [answerId]: "success" },
//         results: results,
//       })

//       const timeout = window.setTimeout(() => {
//         if (this.isQuizFinished()) {
//           this.setState({
//             isFinished: true,
//           })
//         } else {
//           this.setState({
//             activeQuestion: this.state.activeQuestion + 1,
//             answerState: null,
//           })
//         }

//         window.clearTimeout(timeout)
//       }, 1000)
//     } else {
//       results[question.id] = "error"
//       this.setState({
//         answerState: { [answerId]: "error" },
//         results: results,
//       })
//     }
//   }

//   isQuizFinished() {
//     return this.state.activeQuestion + 1 === this.state.quiz.length
//   }

//   retryHandler = () => {
//     this.setState({
//       activeQuestion: 0,
//       answerState: null,
//       isFinished: false,
//       results: {},
//     })
//   }

//   async componentDidMount() {
//     try {
//       console.log("this.props.match.params.id: ", this.props.match.params.id)
//       const response = await axios.get(
//         `/quizes/${this.props.match.params.id}.json`
//       )
//       const quiz = response.data
//       this.setState({
//         quiz,
//         loading: false,
//       })
//     } catch (error) {
//       console.log("error: ", error)
//     }
//   }

//   render() {
//     console.log("this.props.match.params.id: ", this.props)
//     return (
//       <div className={classes.Quiz}>
//         <div className={classes.QuizWrapper}>
//           <h1>Ответьте на все вопросы:</h1>

//           {this.state.loading ? (
//             <Loader />
//           ) : this.state.isFinished ? (
//             <FinishedQuiz
//               results={this.state.results}
//               quiz={this.state.quiz}
//               onRetry={this.retryHandler}
//             />
//           ) : (
//             <ActiveQuiz
//               answers={this.state.quiz[this.state.activeQuestion].answers}
//               question={this.state.quiz[this.state.activeQuestion].question}
//               onAnswerClick={this.onAnswerCLickHandler}
//               quizLength={this.state.quiz.length}
//               answerNumber={this.state.activeQuestion + 1}
//               state={this.state.answerState}
//             />
//           )}
//         </div>
//       </div>
//     )
//   }
// }

// export default Quiz

function Quiz() {
  // state = {
  //   results: {},
  //   isFinished: false,
  //   activeQuestion: 0,
  //   answerState: null,
  //   quiz: [],
  //   loading: true,
  // }

  const [results, setResult] = useState({})
  const [isFinished, setIsFinished] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [answerState, setAnswerState] = useState(null)
  const [quiz, setQuiz] = useState([])
  const [loading, setLoading] = useState(true)

  const onAnswerCLickHandler = (answerId) => {
    console.log("answerId: ", answerId)
    if (this.state.answerState) {
      const key = Object.keys(answerState)[0]
      if (answerState[key] === "success") {
        return
      }
    }

    const question = quiz[this.state.activeQuestion]
    const results = results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success"
      }
      setAnswerState({ [answerId]: "success" })
      setResult(results)
      // this.setState({
      //   answerState: { [answerId]: "success" },
      //   results: results,
      // })

      const timeout = window.setTimeout(() => {
        if (isQuizFinished()) {
          setIsFinished(true)
          // this.setState({
          //   isFinished: true,
          // })
        } else {
          setActiveQuestion(activeQuestion + 1)
          setAnswerState(null)
          // this.setState({
          //   activeQuestion: this.state.activeQuestion + 1,
          //   answerState: null,
          // })
        }

        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = "error"
      setAnswerState({ [answerId]: "error" })
      setResult(results)
      // this.setState({
      //   answerState: { [answerId]: "error" },
      //   results: results,
      // })
    }
  }

  function isQuizFinished() {
    return activeQuestion + 1 === quiz.length
  }

  const retryHandler = () => {
    setActiveQuestion(0)
    setAnswerState(null)
    setIsFinished(false)
    setResult({})
    // this.setState({
    //   activeQuestion: 0,
    //   answerState: null,
    //   isFinished: false,
    //   results: {},
    // })
  }

  async function componentDidMount() {
    try {
      // let { id } = useParams()
      console.log("this.props.match.params.id: ", this.props.match.params.id)
      // console.log("useParams: ", id)
      const response = await axios.get(
        `/quizes/${this.props.match.params.id}.json`
      )
      const quiz = response.data
      setQuiz(quiz)
      setLoading(false)
      // this.setState({
      //   quiz,
      //   loading: false,
      // })
    } catch (error) {
      console.log("error: ", error)
    }
  }

  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1>Ответьте на все вопросы:</h1>

        {loading ? (
          <Loader />
        ) : isFinished ? (
          <FinishedQuiz results={results} quiz={quiz} onRetry={retryHandler} />
        ) : (
          <ActiveQuiz
            answers={quiz[activeQuestion].answers}
            question={quiz[activeQuestion].question}
            onAnswerClick={onAnswerCLickHandler}
            quizLength={quiz.length}
            answerNumber={activeQuestion + 1}
            state={answerState}
          />
        )}
      </div>
    </div>
  )
}

export default Quiz
