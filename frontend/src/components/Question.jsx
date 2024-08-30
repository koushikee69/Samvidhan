import React from "react";

const Question = ({ questionNo, questionObj, selectedAnswer, onAnswerSelect }) => {
  const handleOptionClick = (option) => {
    if (selectedAnswer === null || selectedAnswer === undefined) {
      onAnswerSelect(option);
    }
  };

  return (
    <>
      <div className="mb-4">
        <h2 className="font-bold">Question {questionNo + 1}</h2>
        <h4 className="text-lg font-medium mb-2">{questionObj.question}</h4>
        <ul className="list-none pl-0">
          {questionObj.options.map((option, i) => (
            <li
              key={i}
              onClick={() => handleOptionClick(option)}
              className={`cursor-pointer p-2 rounded ${
                selectedAnswer === option
                  ? option === questionObj.correctAnswer
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
      
    </>
  );
};

export default Question;
