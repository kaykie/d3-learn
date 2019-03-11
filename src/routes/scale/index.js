import React,{Component} from 'react'
import * as d3 from 'd3'

const dataset = [1.2, 2.3, 0.9, 1.5, 3.3];
const index = [1,2,3,4,5,6];
const color = ['red','blue','yellow','gery','green','black'];
const marge = {top:60,bottom:60,left:60,right:60};
const dataset2 = [ 2.5 , 2.1 , 1.7 , 1.3 , 0.9 ];


class Scale extends Component{

  componentDidMount() {
    const scaleLinear = d3.scaleLinear()
      .domain([d3.min(dataset),d3.max(dataset)])
      .range([0,300]);
    console.log(scaleLinear(1));
    const scaleOrinal = d3.scaleOrdinal()
      .domain(index)
      .range(color);
    console.log(scaleOrinal(1.1));
    const svg = d3.select('svg');
    const g = svg.append('g')
      .attr('transform',`translate(${marge.left},${marge.top})`);

    g.selectAll('rect')
      .data(dataset2)
      .enter()
      .append('rect')
      .attr('x',20)
      .attr('y',(d,i) => i*30)
      .attr('rx',5)
      .attr('ry',5)
      .attr('width',d => scaleLinear(d))
      .attr('height',25)
      .attr('fill','yellow')
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

export default Scale
