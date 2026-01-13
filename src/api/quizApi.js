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
    console.error("Error Fetching:", error);
    return [];
  }
};
