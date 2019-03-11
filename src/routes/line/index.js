/**
 * Created by apple on 2019/1/17.
 */
import React, {Component} from 'react'
import * as d3 from 'd3'

const data = [
  {x: "上海", y: 100},
  {x: "北京", y: 200},
  {x: "天津", y: 280},
  {x: "西安", y: 100},
  {x: "武汉", y: 240},
  {x: "长沙", y: 210},
  {x: "深圳", y: 100},
  {x: "郑州", y: 220},
  {x: "驻马店", y: 410},
  {x: "信阳", y: 100},
  {x: "漯河", y: 220},
  {x: "商丘", y: 210},
  {x: "南阳", y: 100},
  {x: "纽约", y: 220},
  {x: "南昌", y: 210}
];
class Line extends Component {


  componentDidMount() {
    const initWidth = 340, initHeight = 500, padding = {top: 20, left: 40, right: 10, bottom: 20},
      height = initWidth - padding.top - padding.bottom, width = initHeight - padding.left - padding.right;
    let svg = d3.select('.line')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('padding-left', padding.left)
      .style('padding-right', padding.right)
      .style('padding-top', padding.top)
      .style('padding-bottom', padding.bottom);

    let yData = data.map(d => d.y);
    let yScale = d3.scaleLinear()
      .domain([0, d3.max(yData)])
      .range([height, 0]); // 从上到下 为最大到最小
    let _yScale = d3.scaleLinear()
      .domain([0, d3.max(yData)])
      .range([0,height]);
    let yAxis = d3.axisLeft(yScale);
    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,0)')
      .call(yAxis);


    let xData = data.map(d => d.x);
    let xScale = d3.scaleBand()
      .domain(xData) // 设置数据
      .rangeRound([0, width]) // 设置这些数据需要展示在什么范围内
      .padding(0.1); // 设置两个点之间的距离比例
    let xAxis = d3.axisBottom(xScale); // 设置说明文字处理哪个方向
    svg.append('g')
      .attr('class', 'axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis); // 为当前选择集指向相应的函数

    console.log(yScale(280));
    console.log(_yScale(280));
    // 这里之所以用_yScale是为了计算rect距离顶部的距离,如果采用的是yScale 计算的起点是下方,具体看上面两个console 结果
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(d.x))
      .attr('y',d => height - _yScale(d.y))
      .attr('width',xScale.bandwidth())
      .attr('height',d => _yScale(d.y))
      .attr('fill','green')

    svg.append('g')
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr('x',d => xScale(d.x))
      .attr('y',d => height - _yScale(d.y))
      .attr('dy','1em') // 相对于y 的相对坐标
      .attr('dx',xScale.bandwidth()/2)
      .attr('text-anchor','middle') // text-anchor 相对于基线, 默认为 start
      .attr('font-size','12px')
      .attr('fill','#fff')
      .text(d => d.y)

    svg.selectAll('rect')
      .on('mouseover',function(){
        d3.select(this).attr('fill','#f00')
      })
      .on('mouseout',function () {
        d3.select(this).attr('fill','green')
      })
  }

  render() {
    return (
      <div className="line">

      </div>
    )
  }
}


export default Line
