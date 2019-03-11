import React ,{Component} from 'react'
import * as d3 from 'd3'

const dataset = [ 2.5 , 2.1 , 1.7 , 1.3 , 0.9 ];


class Axis extends Component{

  componentDidCatch(error, errorInfo) {
    console.log(error,errorInfo)
  }

  componentDidMount() {
    const g = d3.select('svg')
      .append('g')
      .attr('transform',`translate(${20},${30})`);
    const xScale = d3.scaleLinear()
      .domain([0,d3.max(dataset)])
      .range([0,300]);
    const xAxis = d3.axisBottom(xScale)
      .tickSizeInner(30)
      .tickSizeOuter(39)
      .tickPadding(29)
      .ticks(7);
    g.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x',20)
      .attr('y',(d,i) => i*25)
      .attr('width',d => xScale(d))
      .attr('height',20)
      .attr('fill','blue');
    g.append('g')
      .attr('transform',`translate(20,${25*dataset.length})`)
      .call(xAxis)
  }

  render(){
    return(
      <div>
        <svg>

        </svg>
      </div>
    )
  }
}

export default Axis
