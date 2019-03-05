import React from 'react';
import {connect} from 'dva';
import * as d3 from "d3";
import './index.less'
// import graph from '../utils/graph'
// const data = [12, 33, 44, 66, 88];
// const data2 = [{x: 20, y: 30}, {x: 20, y: 90}, {x: 20, y: 150}];
// const data3 = [{x: 120, y: 30}, {x: 120, y: 90}, {x: 120, y: 150}, {x: 120, y: 210}];

// function line_generate(data) {
//   d3.svg(data)
//     .then((res)=>{
//     console.log(res);
//       res.line()
//     })
// }

function upadte(data, g) {
  let t = d3.transition()
    .duration(750);

  // JOIN new data with old elements.
  let text = g.selectAll("text")
    .data(data, function (d) {
      return d;
    });
  text.exit()
    .attr('class', 'exit')
    .transition(t)
    .attr('y', -60)
    .style('fill-opacity', 1e-6)
    .remove();

  text.attr('class', 'update')
    .attr('y', 0)
    .style('fill-opacity', 1)
    .attr('x', (d, i) => i * 32);


  // ENTER new elements present in new data.
  text.enter().append("text")
    .attr("class", "enter")
    .attr('dy', '10')
    .attr('y', 60)
    .attr('x', (d, i) => i * 32)
    .style('fill-opacity', 1e-6)
    .text(d => d)
    .transition(t)
    .attr('y', 0)
    .style('fill-opacity', 1)
}

class IndexPage extends React.Component {


  componentDidMount() {
    // let svg = d3.select('.container').append('svg').attr('width', '100%').attr('height', '100%');
    // let lineGeneratr = d3.line()
    //   .x((d, i) => i)
    //   .y((d, i) => d);
    // let g = svg.append('g').attr('transform', 'translate(50,50)');
    // let path = g.append('path'); // d 即为path的属性
    // console.log(path);
    // path.attr('d', lineGeneratr(data));
    // // svg.append('circle')
    // //   .attr('cx', 30)
    // //   .attr('cy', 40)
    // //   .attr('r', 30);
    // svg.selectAll('circle')
    //   .data(data2)
    //   .enter()
    //   .append('circle')
    //   .attr('cx', (d) => d.x)
    //   .attr('cy', (d) => d.y)
    //   .attr('r', 20);
    //
    // let circle = svg.selectAll('circle')
    //   .data(data3);
    // circle
    //   .exit()
    //   .transition()
    //   .attr('r',0)
    //   .remove();
    // circle
    //   .enter()
    //   .append('circle')
    //   .merge(circle)
    //   .attr('cx', (d) => d.x)
    //   .attr('cy', (d) => d.y)
    //   .attr('r', 20);
    // circle
    //   .enter()
    //   .transition()
    //   .attr('cx',200)
    const alphabet = 'abcdefghigklmnopqrstuvwxyz'.split('');
    let mySvg = d3.select('.container').append('svg').attr('width', '960').attr('height', '500'),
      height = +mySvg.attr('height'),
      g = mySvg.append('g').attr('transform', 'translate(32,' + height / 2 + ')');
    upadte(alphabet, g);
    d3.interval(()=>{
      upadte(d3.shuffle(alphabet)
        .slice(0,Math.floor(Math.random()*26)
        ).sort()
        ,g
      )
    },1500);
    // console.log(width)
  }

  render() {
    return (
      <div>
        <div className="container">
        </div>
      </div>
    )
  }
}

export default connect()(IndexPage);
