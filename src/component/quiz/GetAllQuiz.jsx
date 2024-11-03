import React, { useEffect, useState } from "react";
import { deleteQuestion, getAllQuestions } from "../../utils/QuizService";
import { NavLink } from "react-router-dom";
import { FaPlus  } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
// import {   MdDeleteOutline } from 'react-icons/all'; 
const GetAllQuiz = () => {

  const[questions, setQuestion] = useState([
    {id: "", question: "", correctAnswers:"", choices:[]}])
  const[isLoading, setIsLoading]   =  useState(true)
  const[isQuestionDeleted, setIsQuestionDeleted] = useState(false)
  const[deleteSuccessMessage, setDeleteSuccessMessage] = useState("")

  useEffect(() => {
    fetchAllQuestion()
  }, [])  
  
  const fetchAllQuestion = async() => {
    try {
      const data = await getAllQuestions()
      setQuestion(data)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }
  const handleDelete = async(id) => {
    try {
      await deleteQuestion(id)
      setQuestion(questions.filter((questions) => questions.id !== id))
      setIsQuestionDeleted(true)
      setDeleteSuccessMessage("Question deleted Successfulluy!")
    } catch (error) {
      console.error(error )
    }
    
    setTimeout(() =>  {
      setDeleteSuccessMessage("")
    }, 4000)
  }

  if(isLoading) {
    return <div>Loading...</div>
  }

  return (
    <section className="container">
    <div className="row mt-5">
      <div className="col-md-6 mb-2 md-mb-0" style={{ color: 'gray' }}>
        <h4>Quản Lý Câu Hỏi</h4>
      </div>

      <div className="col-md-4 d-flex justify-content-end">
        <NavLink to="/create-quiz" className="btn btn-primary">
          <FaPlus /> Thêm Câu Hỏi
        </NavLink>
      </div>
    </div>
    <hr />
    {isQuestionDeleted && <div className="alert alert-success">{deleteSuccessMessage}</div>}
    {questions.map((question, index) => (
      <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h4 style={{ color: 'gray' }}>{`${index + 1}. ${question.question}`}</h4>

        <ul>
          {question.choices.map((choice, index) => (
            <li key={index}>{choice}</li>
          ))}
        </ul>
        <p className="text-success">Đáp án đúng: {question.correctAnswers}</p>
        <div className="btn-group">
          <button className="btn btn-outline-primary">
            <NavLink to={`/update-quiz/${question.id}`} style={{ color: '#007bff', textDecoration: 'none' }}>
              <CiEdit /> Sửa Câu Hỏi
            </NavLink>
          </button>
          <button className="btn btn-outline-danger" onClick={() => handleDelete(question.id)}>
            <MdDeleteOutline /> Xóa Câu Hỏi
          </button>
        </div>
      </div>
    ))}
  </section>
);
  


}

export default GetAllQuiz