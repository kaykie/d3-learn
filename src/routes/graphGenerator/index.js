/**
 * Created by apple on 2019/1/18.
 */

import React, {Component} from 'react';
import * as d3 from 'd3'
import './index.less'

class Graph extends Component {

  state = {
    links: [
      {source: 'Microsoft', target: 'Amazon', type: 'licensing'},
      {source: 'Microsoft', target: 'HTC', type: 'licensing'},
      {source: 'Samsung', target: 'Apple', type: 'suit'},
      {source: 'Motorola', target: 'Apple', type: 'suit'},
      {source: 'Nokia', target: 'Apple', type: 'resolved'},
      {source: 'HTC', target: 'Apple', type: 'suit'},
      {source: 'Kodak', target: 'Apple', type: 'suit'},
      {source: 'Microsoft', target: 'Barnes & Noble', type: 'suit'},
      {source: 'Microsoft', target: 'Foxconn', type: 'suit'},
      {source: 'Oracle', target: 'Google', type: 'suit'},
      {source: 'Apple', target: 'HTC', type: 'suit'},
      {source: 'Microsoft', target: 'Inventec', type: 'suit'},
      {source: 'Samsung', target: 'Kodak', type: 'resolved'},
      {source: 'LG', target: 'Kodak', type: 'resolved'},
      {source: 'RIM', target: 'Kodak', type: 'suit'},
      {source: 'Sony', target: 'LG', type: 'suit'},
      {source: 'Kodak', target: 'LG', type: 'resolved'},
      {source: 'Apple', target: 'Nokia', type: 'resolved'},
      {source: 'Qualcomm', target: 'Nokia', type: 'resolved'},
      {source: 'Apple', target: 'Motorola', type: 'suit'},
      {source: 'Microsoft', target: 'Motorola', type: 'suit'},
      {source: 'Motorola', target: 'Microsoft', type: 'suit'},
      {source: 'Huawei', target: 'ZTE', type: 'suit'},
      {source: 'Ericsson', target: 'ZTE', type: 'suit'},
      {source: 'Kodak', target: 'Samsung', type: 'resolved'},
      {source: 'Apple', target: 'Samsung', type: 'suit'},
      {source: 'Kodak', target: 'RIM', type: 'suit'},
      {source: 'Nokia', target: 'Qualcomm', type: 'suit'}
    ]
  };

  componentDidMount() {
    let nodes = {};
    this.state.links.forEach(link => {
      link.source = nodes[link.source] ||
        (nodes[link.source] = {name: link.source});
      link.target =
        nodes[link.target] ||
        (nodes[link.target] = {name: link.target})
    });
    console.log(nodes);
    this.initView(nodes);
  }

  initView(nodes) {
    let svgNode = d3.select('.mySvg')
      .append('defs')
      .selectAll('marker')
      .data(['suit', 'licensing', 'resolved'])
      .enter()
      .append('marker')
      .attr('id', d => d)
      .attr('viewBox', '0 -5 10 10') // 可视范围 0,-5 为左上角, 10,10 为右下角
      .attr('refX', 22) // refX,refY指定源点
      .attr('refY', -1.5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto') // 可以让箭头自动指向线的方向
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5');


    let path = d3.select('.mySvg').append('g')
      .selectAll('path')
      .data(this.state.links)
      .enter()
      .append('path')
      .attr('class', d => 'link ' + d.type)
      .attr('marker-end', d => `url(#${d.type})`); // 在这条线的末尾加箭头

    let circle = d3.select('.mySvg')
      .append('g')
      .selectAll('circle')
      .data(d3.values(nodes))
      .enter()
      .append('circle')
      .attr('r', 10)
      .style('cursor', 'pointer');
    // .call(this.enableDragFunc())

    let text = d3.select('.mySvg')
      .append('g')
      .selectAll('text')
      .data(d3.values(nodes))
      .enter()
      .append('text')
      .attr('x', 12)
      .attr('y', '.31em')
      .text(d => d.name)

    this.setState({
      svgNode,
      path,
      circle,
      text
    }, ()=>{
      this.drawSampleNodes();
      this.draw(nodes)
    })
  }

  draw(nodes) {
    const width = parseInt(
      d3.select('.mySvg')
        .style('width')
        .substring(0, d3.select('.mySvg').style('width').length - 2),10
    );
    const height = parseInt(
      d3.select('.mySvg')
        .style('height')
        .substring(0, d3.select('.mySvg').style('height').length - 2)
    ,10);

    const forceLink = d3.forceLink(this.state.links) // 创建一个弹簧作用力
      .distance(80)
      .strength(0.2)
      .iterations(3);

    d3.forceSimulation(d3.values(nodes))
      .force('charge',d3.forceManyBody().strength(50)) // 创建一个电荷作用力模型.
      .force('collide',d3.forceCollide().radius(50)) // 创建一个圆形区域的碰撞检测力模型
      .force('link',forceLink)
      .force('center',d3.forceCenter().x(width/2).y(height/2)) // 创建一个中心作用力
      .on('tick',()=>{
        if(this.state.path){
          this.state.path.attr('d',this.linkArc);
          this.state.circle.attr('transform',this.transform);
          this.state.text.attr('transform',this.transform)
        }
      })

  }

  transform(d){
    return `translate(${d.x},${d.y})`
  }

  forceLink(){

  }

  drawSampleNodes() {
    const sampleContainer = d3.select('.mySvg')
      .append('g')
      .attr('class', 'sampleContainer');
    const xIndex = 200;
    const yIndex = 100; // 设置简单实例的x,y轴
    const sampleData = [
      {
        source: {name: 'Nokia', x: xIndex, y: yIndex},
        target: {name: 'Qualcomm', x: xIndex + 100, y: yIndex},
        title: 'Still in suit:',
        type: 'suit'
      },
      {
        source: {name: 'Qualcomm', x: xIndex, y: yIndex + 100},
        target: {name: 'Nokia', x: xIndex + 100, y: yIndex + 100},
        title: 'Already resolved:',
        type: 'resolved'
      },
      {
        source: {name: 'Microsoft', x: xIndex, y: yIndex + 200},
        target: {name: 'Amazon', x: xIndex + 100, y: yIndex + 200},
        title: 'Locensing now:',
        type: 'licensing'
      }
    ];

    // 提取有多少个圆圈
    const nodes = {};
    sampleData.forEach((link, index) => {
      nodes[link.source.name + index] = link.source;
      nodes[link.target.name + index] = link.target
    });
    // 画弧线+箭头
    sampleContainer.selectAll('path')
      .data(sampleData)
      .enter()
      .append('path')
      .attr('class', d => 'link ' + d.type)
      .attr('marker-end', d => `url(#${d.type})`)
      .attr('d', this.linkArc);


    // 画圆圈
    sampleContainer.selectAll('circle')
      .data(d3.values(nodes))
      .enter()
      .append('circle')
      .attr('r', 10)
      .style('cursor', 'pointer')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    // 每个圆圈下面的标题
    sampleContainer.selectAll('.title')
      .data(d3.values(nodes))
      .enter()
      .append('text')
      .style('text-anchor', 'middle')
      .attr('x', d => d.x)
      .attr('y', d => d.y + 24)
      .text(d => d.name);

    // 前面的标题
    sampleContainer.selectAll('.companyTitle')
      .data(sampleData)
      .enter()
      .append('text')
      .attr('class', 'msg-title')
      .style('text-anchor', 'end')
      .attr('x', xIndex - 30)
      .attr('y', (d, i) => yIndex + 5 + i * 100)
      .text(d => d.title);

  }

  linkArc(d) {
    //SVG椭圆弧路径指令说明：
    //指令	A (绝对) a (相对)
    //名称	elliptical arc 椭圆弧
    //参数
    //(rx ry x-axis-rotation large-arc-flag sweep-flag x y)+
    //rx ry 是椭圆的两个半轴的长度。
    //x-axis-rotation 是椭圆相对于坐标系的旋转角度，角度数而非弧度数。
    //large-arc-flag 是标记绘制大弧(1)还是小弧(0)部分。
    //sweep-flag 是标记向顺时针(1)还是逆时针(0)方向绘制。
    //x y 是圆弧终点的坐标

    const dx = d.target.x - d.source.x;
    const dy = d.target.y - d.source.y;
    const dr = Math.sqrt(dx * dx + dy * dy);
    return `M ${d.source.x},${d.source.y} A ${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`
  }


  enableDragFunc() {

  }

  render() {
    return (
      <div className="graph">
        <svg className="mySvg" width="1200" height='800'>

        </svg>
      </div>
    )
  }
}


export default Graph
