import React from "react"
import { useLocation} from "react-router-dom"

 const QuizResult = () => {
		const location = useLocation()
		const { quizQuestions, totalScores } = location.state
		const numQuestions = quizQuestions.length
		const percentage = Math.round((totalScores / numQuestions) * 100)

		const handleRetakeQuiz = () => {
			alert("Oops! this functionality was not implemented!!!")
		}

		return (
			<section className="container mt-5" style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ color: '#007bff' }}>Your Quiz Result Summary</h3>
      <hr />
      <h5 className="text-info">
        You answered {totalScores} out of {numQuestions} questions correctly.
      </h5>
      <p>Your total score is {percentage}%.</p>

      <button className="btn btn-primary btn-sm" style={{ backgroundColor: '#28a745', borderColor: '#28a745' }} onClick={handleRetakeQuiz}>
        Retake this quiz
      </button>
    </section>
		)
 }

 export default QuizResult