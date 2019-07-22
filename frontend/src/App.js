import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const QUERY = gql`
  {
    tasks {
      name
      project {
        name
      }
    }
  }
`;

function TasksList(props) {
  const {loading, error, data} = props;
  if(loading) {
    return (
      <div>Loading...</div>
    )
  } else if(error) {
    return (
      <div>Error!</div>
    )
  }
  return (
    <div className="App">
      <ul>
        {data.tasks.map(task => {
          return (
            <li>{task.name} ({task.project ? task.project.name : ''})</li>
            )
        })}
      </ul>

    </div>
  );
}

function App() {
  return (
    <Query query={QUERY} >
      {(data) =>
        <TasksList {...data}/>
      }
      </Query>
  );
        }

        export default App;
