import sys
import json
import joblib
import pandas as pd

model = joblib.load('predictor_model.joblib')

def predict(data):
    batting_team = data['battingTeam']
    bowling_team = data['bowlingTeam']
    city = data['city']
    runs_left = float(data['runsLeft'])
    balls_left = float(data['ballsLeft'])
    wickets_left = float(data['wicketsLeft'])
    current_run_rate = float(data['currentRunRate'])
    required_run_rate = float(data['requiredRunRate'])
    target = float(data['target'])

    input_data = [[batting_team, bowling_team, city, runs_left, balls_left, wickets_left,
                   current_run_rate, required_run_rate, target]]
    columns = ['BattingTeam', 'BowlingTeam', 'City', 'runs_left', 'balls_left',
               'wickets_left', 'current_run_rate', 'required_run_rate', 'target']
    input_df = pd.DataFrame(input_data, columns=columns)

    prediction = model.predict_proba(input_df)

    result = {
        'team1': batting_team,
        'team2': bowling_team,
        'probability1': float(prediction[0, 0]),
        'probability2': float(prediction[0, 1])
    }

    return result

if __name__ == '__main__':
    input_data = json.loads(sys.argv[1])
    result = predict(input_data)

    print(json.dumps(result))
