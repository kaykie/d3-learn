import React,{Component} from 'react'
import * as d3 from 'd3'
const dataset = [ 10,20,30,23,13,40,27,35,50 ];

class DynamicLine extends Component{

  componentDidMount() {
    const marge = {left:60,bottom:60,right:60,top:60};
    const svg = d3.select('svg');
    const width = svg.attr('width'),height = svg.attr('height');
    const g = svg.append('g')
      .attr('transform',`translate(${marge.left},${marge.top})`);

    const xScale = d3.scaleBand()
      .domain(d3.range(dataset.length))
      .rangeRound([0,width - marge.left - marge.right]);
    const xAxis = d3.axisBottom(xScale);
    const yScale = d3.scaleLinear()
      .domain([0,d3.max(dataset)])
      .range([height - marge.bottom-marge.top,0]);
    const yAxis = d3.axisLeft(yScale);
    g.append('g')
      .attr('transform',`translate(0,${height - marge.top - marge.bottom})`)
      .call(xAxis);
    g.append('g')
      .attr('transform',`translate(0,0)`)
      .call(yAxis);
    const gs = g.selectAll('.rect')
      .data(dataset)
      .enter()
      .append('g');
    const rectPadding = 20;
    gs.append('rect')
      .on('mouseover',function () {
        d3.select(this)
          .transition()
          .duration(2000)
          .attr('fill','yellow')
      })
      .attr('x',(d,i) => xScale(i) + rectPadding/2)
      .attr('y',d => {
        const min = yScale.domain()[0];
        console.log(yScale(min));
        return yScale(min)
      })
      .attr('height',d => 0)
      .transition()
      .duration(2000)
      .delay(400)
      // .ease(d3.easeBack)
      .attr('width',xScale.step() - rectPadding) // step() 获取两点之间的距离
      .attr('y',d => yScale(d))
      .attr('height',d =>  height - yScale(d) - marge.bottom - marge.top)
      .attr('fill','blue');


    gs.append('text')
      .attr('x',(d,i) => xScale(i) + rectPadding/2)
      .attr('y',d =>{
        const min = yScale.domain()[0];
        return yScale(min)
      })
      .attr('dx',(d,i) => (xScale.step() - rectPadding)/2)
      .attr('dy',20)
      .text(d => d)
      .transition()
      .duration(2000)
      .delay(400)
      .attr('y',d => yScale(d))

    console.log(d3.range(dataset.length))
  }

  render(){
    return(
      <div>
        <svg width='960' height='600'>

        </svg>
      </div>
    )
  }
}

export default DynamicLine
