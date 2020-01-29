// Let's import React, our styles and React Async
import React from 'react';
//import './App.css';
import Async from 'react-async';

// We'll request user data from this API
const loadUsers = () =>
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())

// Our component
function Table() {
  return (
    <div className="container">
      <Async promiseFn={loadUsers}>
        {({ data, error, isLoading }) => {
          if (isLoading) return "Loading..."
          if (error) return `Something went wrong: ${error.message}`

          if (data)
            return (
              <div>
                <div>
                  <h2>React Async - Random Users</h2>
                </div>
                {data.map((level1: any) => (
                  /*
                    level1.map((level2: any) => (
                      <div>
                      <p>{level2['_source']['document_name']}</p>
                      </div>
                    ))
                    */
                    <div>length = {JSON.stringify(level1)}</div>
                ))};

              </div>
            )
        }}
      </Async>
    </div>
  );
}

export default Table;
