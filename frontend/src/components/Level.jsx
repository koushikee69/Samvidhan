import React, { useState } from "react";
import Question from "./Question";

const Level = ({ data }) => {
  const { level, article, description, questions } = data;
  const [openQuiz, setOpenQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleAnswerSelection = (questionIndex, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const onSubmit = () => {
    const numSelectedAnswers = Object.keys(selectedAnswers).length;
    if (numSelectedAnswers === questions.length) {
      const correctAnswersCount = questions.reduce((count, question, index) => {
        return selectedAnswers[index] === question.correctAnswer ? count + 1 : count;
      }, 0);

      setScore(correctAnswersCount);
      setOpenQuiz(false);
      //   console.log(`Score: ${correctAnswersCount} out of ${questions.length}`);
    } else {
      alert("Complete your quiz!!!");
    }
  };

  const resetAnswers = () => {
    setSelectedAnswers({});
    setScore(null);
  };

  return (
    <div className="m-5 p-5 border border-gray-300 rounded-lg bg-white shadow-md transition-all duration-500 min-h-96">
      <h2 className="text-2xl font-bold mb-4">Level {level}</h2>
      <h3 className="text-xl font-semibold mb-3">{article}</h3>
      <div className="mb-6">
        <p className="mb-2">{description.para1}</p>
        <p>{description.para2}</p>
      </div>
      <div className="w-full flex justify-between items-center">
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700" onClick={() => setOpenQuiz(!openQuiz)}>
          {openQuiz ? "Close Quiz" : "Start Quiz"}
        </button>
      </div>

      {openQuiz && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-100 shadow-md">
          <h4 className="text-xl font-semibold mb-4">Quiz</h4>
          <div className="space-y-6">
            {questions.map((questionObj, index) => (
              <Question
                key={index}
                questionNo={index}
                questionObj={questionObj}
                selectedAnswer={selectedAnswers[index]}
                onAnswerSelect={(option) => handleAnswerSelection(index, option)}
              />
            ))}
            <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700" onClick={onSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
      {score !== null && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-100 shadow-md">
          <div>
            <h4 className="text-xl font-semibold mb-4">Your Score</h4>
            <p className="text-lg">
              You scored {score} out of {questions.length}
            </p>
          </div>
          <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mt-2" onClick={resetAnswers}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Level;
