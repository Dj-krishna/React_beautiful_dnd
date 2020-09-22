import React, { Component } from 'react';

class Table extends Component {
  render() {
    const items = this.props.items;
    return (
      <div id="Table">
        <table>
          <tbody>
            <tr>
              <h1>Rows</h1>
            </tr>
            {items.map(item => {
              return (
                <tr>
                  <td>{item.username}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;