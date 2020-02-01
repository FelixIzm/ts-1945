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
import Async from 'react-async';
const loadUsers = () =>
    fetch("https://fastify-1945.herokuapp.com/search/documents?unit=147&date_from=01.01.1945")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())


let id = 0;
const createData = (name: string) => {
    id += 1;
    return { id, name };
  };
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

//interface ILevel3 extends Array<ILevel2>{};

/*
interface ILevel3{
 [key: number]: ILevel2;
}
*/
interface IDataType{
  query: Array<ILevel2>;
}
const getJson = async (): Promise<IDataType> =>  {
    const response = await fetch("https://fastify-1945.herokuapp.com/search/documents?unit=147&date_from=01.01.1945")
    const data = await response.json();
    return data;
  }

// Our component
const FxTable: React.SFC<Props> = props => {
  const { classes } = props;
//Здесть все работает - выводит данные
const at = getJson()
    .then((data: IDataType) =>{
      var authors : string[] = [];
      authors.push('Пушкин');
            //console.log(data.query);
      for (let items of data.query){
        for (let item of items){
            //console.log(item._source.authors);
            authors.push(item._source.authors)
        }
      }
      return authors; 
    })
  
  return (
        <Paper className={classes.root}>
            <p>Example use of props: {props.hi}</p>
            <Table className={classes.table} >
                <TableHead>
                <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {
                      at.then(authors => {
                        authors.map(row => {
                          return(
                                <TableRow>
                                <TableCell>{row}</TableCell>
                                </TableRow>
                              );
                        })
  
                      })
                    }
                </TableBody>
            </Table>
            </Paper>

  );


}

export default withStyles(styles)(FxTable);
