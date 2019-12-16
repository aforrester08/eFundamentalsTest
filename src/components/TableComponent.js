import React from 'react';

const TableComponent = props => {

  const list = Object.keys(props.counts).map(key => {
    return <tr style={{fontSize: props.counts[key]*20}}><td>{key}</td><td>{props.counts[key]}</td></tr>
  });

  return(
    <div>
    <table>
    <tr style={{fontSize: "30px"}}>
      <th>Word</th>
      <th>Number of Occurences</th>
    </tr>
    {list}
    </table>
    </div>
  )
}

export default TableComponent
