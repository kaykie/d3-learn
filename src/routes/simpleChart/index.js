import React,{Component} from 'react'
import * as d3 from 'd3'
const marge = {top:60,bottom:60,left:60,right:60}//设置边距
const dataset = [ 250 , 210 , 170 , 130 , 90 ];  //数据（表示矩形的宽度）


class SimpleChart extends Component{

  componentDidMount(){
    const svg = d3.select('svg');
    const g = svg.append('g')
      .attr('transform',`translate(${marge.top},${marge.left})`);
    g.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x',20)
      .attr('y',(d,i)=>i*30)
      .attr('width',d => d)
      .attr('height',20)
      .style('fill','blue')
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


export default SimpleChart
