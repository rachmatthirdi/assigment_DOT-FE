import axios from "axios";
import {
  BASE_URL,
  QUESTION_AMOUNT,
  DIFFICULTY,
  QUESTION_TYPE,
} from "../utils/constants";
import { shuffleArray } from "../utils/helpers";
import he from "he";

export const fetchQuestions = async () => {
  try {
    const url = `${BASE_URL}?amount=${QUESTION_AMOUNT}&difficulty=${DIFFICULTY}&type=${QUESTION_TYPE}`;

    console.log("Fetching URL:", url);

    const response = await axios.get(url);

    if (response.data.response_code !== 0) {
      console.error("API Error Code:", response.data.response_code);
      return [];
    }

    const data = response.data.results;

    const formattedData = data.map((question) => ({
      question: he.decode(question.question),
      correctAnswer: he.decode(question.correct_answer),
      answers: shuffleArray([
        ...question.incorrect_answers.map((a) => he.decode(a)),
        he.decode(question.correct_answer),
      ]),
    }));

    return formattedData;
  } catch (error) {
    console.warn("API Gagal/Limit Habis, menggunakan data dummy...", error);

    return [
      {
        question: "Mode Offline: Siapa penemu lampu pijar?",
        correctAnswer: "Thomas Edison",
        answers: ["Nikola Tesla", "Thomas Edison", "Einstein", "Newton"],
      },
      {
        question: "Mode Offline: 1 + 1 = ?",
        correctAnswer: "2",
        answers: ["1", "2", "3", "4"],
      },
      {
        question: "Mode Offline: Siapa penemu Arus AC?",
        correctAnswer: "Nikola Tesla",
        answers: ["Nikola Tesla", "Thomas Tesla", "Einstein", "Newton"],
      },
      {
        question: "Mode Offline: 1 + 1 = ?",
        correctAnswer: "2",
        answers: ["1", "2", "3", "4"],
      },
      {
        question: "Mode Offline: 3 + 1 = ?",
        correctAnswer: "4",
        answers: ["1", "2", "3", "4"],
      },
      {
        question: "Mode Offline: 10 + 001 = ?",
        correctAnswer: "11",
        answers: ["1", "11", "3", "4"],
      },
      {
        question: "Mode Offline: 30 + 1 = ?",
        correctAnswer: "31",
        answers: ["1", "2", "31", "400"],
      },
      {
        question: "Mode Offline: 3 + 11 = ?",
        correctAnswer: "14",
        answers: ["1", "2", "3", "14"],
      },
      {
        question: "Mode Offline: 10 + 1001 = ?",
        correctAnswer: "1011",
        answers: ["1011", "2", "3", "4"],
      },
      {
        question: "Mode Offline: 301 + 1 = ?",
        correctAnswer: "302",
        answers: ["1", "2", "302", "400"],
      },
    ];
  }
};
