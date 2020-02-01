// Let's import React, our styles and React Async
import React from 'react';
import Async from 'react-async';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const loadUsers = () =>
    fetch("https://fastify-1945.herokuapp.com/search/documents?unit=147&date_from=01.01.1945")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())

// Our component
function TableAsync() {
  return (
    <TableContainer component={Paper}>
      <Table  size="small" aria-label="a dense table">
      <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

              <Async promiseFn={loadUsers}>
                {({ data, error, isLoading }) => {
                  if (isLoading) return "Loading..."
                  if (error) return `Something went wrong: ${error.message}`

                  if (data)
                    return (
                      <div>
                        {Object.keys(data).map((level: any) => (
                            data[level].map((level2: any) =>(
                              level2.map((key3: any) =>(
                                <TableRow><TableCell align="left">{key3['_source']['document_name']}</TableCell></TableRow>
                              ))
                            ))
                        ))}
                      </div>
                    )
                }}
              </Async>
      </TableBody>
      </Table>
      </TableContainer>
  );
}

export default TableAsync;
