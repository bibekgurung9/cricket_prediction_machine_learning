# Cricket Match Prediction 

This project is a web-based cricket match prediction platform that predicts match outcomes in two scenarios:
1. **In-Play Prediction**: Predicts the likelihood of a team winning during an ongoing match in the second innings.
2. **Pre-Match Prediction**: Provides predictions for tournament outcomes for all teams before matches commence.

The platform uses **machine learning models** including **regression**, **decision trees**, and **random forest** to make predictions based on historical data and live match data. The frontend is built with **Next.js**, and the backend with **Nest.js** using a **PostgreSQL** database.

---

## Project Structure

- **Frontend**: Developed using Next.js, the frontend provides a responsive and user-friendly interface for displaying match predictions, team statistics, and ongoing match data.
- **Backend**: Powered by Nest.js, the backend handles data processing, API requests, and ML model integration.
- **Database**: PostgreSQL database stores historical match data, team statistics, and model outputs.
- **Machine Learning**: The project uses supervised machine learning techniques (regression, decision trees, and random forest) to generate predictions.

---

## Features

1. **Ongoing Match Prediction**
   - Predicts the winning probability for each team during an ongoing match's second inning.
   - Takes into account live factors like run rate, remaining overs, and wickets.

2. **Tournament Pre-Match Prediction**
   - Pre-match predictions for an 8-team tournament, calculating the likelihood of each team’s victory.
   - Uses historical data, team strength, and past performances for prediction.

3. **Data Visualization**
   - Display probability graphs, live stats, and team performance metrics.
   - Intuitive UI for comparing team strengths and predicting outcomes.

---

## Technologies Used

- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: [Nest.js](https://nestjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Machine Learning Models**:
  - **Regression Models**: For predicting scores and player performance.
  - **Decision Trees**: For classification of win/loss based on match parameters.
  - **Random Forests**: For ensemble-based prediction of match outcomes.
- **Model Deployment**: Machine learning models are integrated within the Nest.js backend.

---
