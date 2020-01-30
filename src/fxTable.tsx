import {
  createStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core';

// Let's import React, our styles and React Async
import React from 'react';
//import './App.css';
import Async from 'react-async';
//<script src="https://gist.github.com/johnsogg/dde852d76aa7af92c1cedd0e594557db.js"></script>
// We'll request user data from this API
const loadUsers = () =>
/*
   fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())
*/
    fetch("https://fastify-1945.herokuapp.com/search/documents?unit=147&date_from=01.01.1945")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())


let id = 0;
const createData = (name: string) => {
    id += 1;
    return { id, name };
  };
 let rows: any[]; 
// make an array of fake data
/*
const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
*/
const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });

// declare props as an extension of the interface we just defined in the 'styles' variable. Any
// other props can appear here. I've put one in as an example of how to use it.
interface Props extends WithStyles<typeof styles> {
  hi: string;
}

// Our component
const thingTable: React.SFC<Props> = props => {
  const { classes } = props;
//function fxTable() {
  return (
        <div className="container">
          <Async promiseFn={loadUsers}>
            {({ data, error, isLoading }) => {
              if (isLoading) return "Loading..."
              if (error) return `Something went wrong: ${error.message}`
    
              if (data)
                Object.keys(data).map((level: any) => (
                    data[level].map((level2: any) =>(
                    level2.map((key3: any) =>(
                        //<p>{key3['_source']['document_name']}</p>
                        rows.push(createData(key3['_source']['document_name']))
                    ))
                    ))
                ));
            
                return (
                    <Paper className={classes.root}>
                    <p>Example use of props: {props.hi}</p>
                    <Table className={classes.table} >
                        <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell>Calories</TableCell>
                            <TableCell>Fat (g)</TableCell>
                            <TableCell>Carbs (g)</TableCell>
                            <TableCell>Protein (g)</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map(row => {
                            return (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                {row.name}
                                </TableCell>
                                <TableCell>{row.calories}</TableCell>
                                <TableCell>{row.fat}</TableCell>
                                <TableCell>{row.carbs}</TableCell>
                                <TableCell>{row.protein}</TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                    </Paper>
                );
            }}
          </Async>
        </div>
      );
    }

export default withStyles(styles)(thingTable);
