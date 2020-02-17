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

interface ISource{
  document_number: number;
  deal_type: any;
  archive: string;
  delo: string;
  date_to: string;
  fond: number;
  operation_name: any;
  document_name: string;
  geo_names: string;
  document_date_b: string;
  secr: string;
  image_path: string;
  delo_id: number;
  id: number;
  document_date_f: string;
  document_type: string;
  opis: string;
  date_from: string;
  authors: string;

}
interface ILevel1{_index: string; _type: string; _id: string; _score: string; _source: ISource;}
interface ILevel2 extends Array<ILevel1>{};
interface IDataType{ query: Array<ILevel2>;}

/*
const loadUsers: IDataType = () => (
    fetch("https://fastify-1945.herokuapp.com/search/documents?unit=147&date_from=01.01.1945")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())
)
*/
const getJson = async (): Promise<IDataType> =>  {
  const response = await fetch("https://fastify-1945.herokuapp.com/search/documents?unit=147&date_from=01.01.1945")
  const data = await response.json();
  return data;
}

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

              <Async promiseFn = {getJson}>
                {({ data, error, isLoading }) => {
                  if (isLoading) return "Loading..."
                  if (error) return `Something went wrong: ${error.message}`
                  if (data){
                    return(
                            data.query.map((element) => (
                              element.map(item =>(
                                <TableRow  key={item._index}><TableCell align="left">{item._source.document_type}</TableCell></TableRow>
                              ))
                            ))
                    )  
                  }
                }}
              </Async>
      </TableBody>
      </Table>
      </TableContainer>
  );
}

export default TableAsync;
