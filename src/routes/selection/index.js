/**
 * Created by apple on 2019/1/16.
 */
import React, {Component} from 'react'
import * as d3 from 'd3'

class Selection extends Component {

  componentDidMount() {
    let td = d3.selectAll('tbody').selectAll('td');
    td.style('color',(d,i)=> i === 0 ? 'red' :null)


  }

  render() {
    return (
      <div>
        <table>
          <thead>
          <tr>
            <td> A</td>
            <td> B</td>
            <td> C</td>
            <td> D</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td> 0</td>
            <td> 1</td>
            <td> 2</td>
            <td> 3</td>
          </tr>
          <tr>
            <td> 4</td>
            <td> 5</td>
            <td> 6</td>
            <td> 7</td>
          </tr>
          <tr>
            <td> 8</td>
            <td> 9</td>
            <td> 10</td>
            <td> 11</td>
          </tr>
          <tr>
            <td> 12</td>
            <td> 13</td>
            <td> 14</td>
            <td> 15</td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Selection
