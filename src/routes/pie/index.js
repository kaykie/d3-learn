import React,{Component} from 'react'
import * as d3 from 'd3'

const dataset = [10,44,12,55,13];

class Pie extends Component{

  componentDidMount() {
    const svg = d3.select('svg'),width = svg.attr('width'),height = svg.attr('height'),
      marge = {left:60,top:60,bottom:60,right:60};
    const g = svg.append('g')
      .attr('transform',`translate(${marge.left},${marge.top})`);
    // 设置一个color的序数比例尺
    const colorScale = d3.scaleOrdinal()
      .domain(d3.range(dataset.length))
      .range(d3.schemeCategory10);
    // 获取绘制饼状图所需要的数据格式
    const pie = d3.pie();
    const pieData = pie(dataset);

    const gs = g.selectAll('.g')
      .data(pieData)
      .enter()
      .append('g')
      .attr('transform',`translate(${width/2},${height/2})`);
    // 绘制圆弧
    const arc = d3.arc()
      .innerRadius(80)
      .outerRadius(200);
    gs.append('path')
      .attr('d',d =>arc(d))
      .attr('fill',(d,i) => colorScale(i));

    gs.append('text')
      .attr('transform',d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor','middle')
      .text(d => d.data);

console.log(pieData)
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

export default Pie
