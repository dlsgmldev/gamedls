import React, { useState } from "react";

const Question = () => {
  const [questions, setQuestions] = useState([
    {
      text: "",
      answers: [
        { text: "", correct: false },
        { text: "", correct: false },
        { text: "", correct: false },
        { text: "", correct: false },
      ],
    },
  ]);

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].text = value;
    setQuestions(updated);
  };

  const handleAnswerChange = (qIndex, aIndex, value) => {
    const updated = [...questions];
    updated[qIndex].answers[aIndex].text = value;
    setQuestions(updated);
  };

  const handleCorrectChange = (qIndex, aIndex) => {
    const updated = [...questions];
    updated[qIndex].answers = updated[qIndex].answers.map((ans, i) => ({
      ...ans,
      correct: i === aIndex,
    }));
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        answers: [
          { text: "", correct: false },
          { text: "", correct: false },
          { text: "", correct: false },
          { text: "", correct: false },
        ],
      },
    ]);
  };

  const generateXML = () => {
    const xml = `<?xml version="1.0" encoding="utf-8"?>\n<questions>\n${questions
      .map(
        (q) => `  <question>
        <text>${q.text}</text>
    ${q.answers
          .map(
            (a) =>
              `    <answer correct="${a.correct ? "true" : "false"}">${a.text}</answer>`
          )
          .join("\n")}
      </question>`
      )
      .join("\n")}
    </questions>`;
  
    // Generate current date in YYYYMMDD_HHMMSS format
    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(
      now.getMonth() + 1
    ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  
    const filename = `group_${dateStr}.xml`;
  
    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  
    alert(`XML file "${filename}" downloaded!`);
  };

  const handleXMLUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (e) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(e.target.result, "text/xml");
  
      const questionNodes = xmlDoc.getElementsByTagName("question");
      const parsedQuestions = [];
  
      for (let i = 0; i < questionNodes.length; i++) {
        const qNode = questionNodes[i];
        const text = qNode.getElementsByTagName("text")[0]?.textContent || "";
  
        const answerNodes = qNode.getElementsByTagName("answer");
        const answers = [];
  
        for (let j = 0; j < answerNodes.length; j++) {
          const aNode = answerNodes[j];
          answers.push({
            text: aNode.textContent || "",
            correct: aNode.getAttribute("correct") === "true",
          });
        }
  
        parsedQuestions.push({ text, answers });
      }
  
      setQuestions(parsedQuestions);
    };
  
    reader.readAsText(file);
  };
  
  


  return (
    <div style={{ padding: "20px" }}>
      <h2>Question Creator</h2>

      <div>
  <h3>Upload Questions from XML</h3>
  <input type="file" accept=".xml" onChange={handleXMLUpload} />
</div>

      {questions.map((q, qIndex) => (
        <div
          key={qIndex}
          style={{
            marginBottom: "30px",
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <label>
            <strong>Question {qIndex + 1}:</strong>
          </label>
          <input
            type="text"
            value={q.text}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            placeholder="Enter question text"
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          {q.answers.map((a, aIndex) => (
            <div key={aIndex}>
              <input
                type="radio"
                checked={a.correct}
                onChange={() => handleCorrectChange(qIndex, aIndex)}
              />
              <input
                type="text"
                value={a.text}
                onChange={(e) =>
                  handleAnswerChange(qIndex, aIndex, e.target.value)
                }
                placeholder={`Answer ${aIndex + 1}`}
                style={{
                  marginLeft: "8px",
                  marginBottom: "5px",
                  padding: "6px",
                  width: "80%",
                }}
              />
            </div>
          ))}
        </div>
      ))}

      <button onClick={addQuestion} style={{ marginRight: "10px" }}>
        + Add Question
      </button>
      <button onClick={generateXML}>Generate XML</button>
    </div>
  );
};

export default Question;
