import React, { Component } from  'react'
import * as d3 from 'd3'





// 准备数据
let nodes = [//节点集
  {name:"湖南邵阳"},
  {name:"山东莱州"},
  {name:"广东阳江"},
  {name:"山东枣庄"},
  {name:"泽"},
  {name:"恒"},
  {name:"鑫"},
  {name:"明山"},
  {name:"班长"}
];

let edges = [// 边集
  {source:0,target:4,relation:"籍贯",value:1.3},
  {source:4,target:5,relation:"舍友",value:1},
  {source:4,target:6,relation:"舍友",value:1},
  {source:4,target:7,relation:"舍友",value:1},
  {source:1,target:6,relation:"籍贯",value:2},
  {source:2,target:5,relation:"籍贯",value:0.9},
  {source:3,target:7,relation:"籍贯",value:1},
  {source:5,target:6,relation:"同学",value:1.6},
  {source:6,target:7,relation:"朋友",value:0.7},
  {source:6,target:8,relation:"职责",value:2}
];


// 力导向图
class Force extends Component{

  componentDidMount() {
    // 初始化常量
    const marge = {top:60,bottom:60,left:60,right:60};
    const svg = d3.select("svg");
    const width = svg.attr("width");
    const height = svg.attr("height");
    const g = svg.append("g")
      .attr("transform","translate("+marge.top+","+marge.left+")");
    const colorScale = d3.scaleOrdinal()
      .domain(d3.range(nodes.length))
      .range(d3.schemeCategory10);
    // 创建力导向图,包括弹簧力模型,电荷力模型,中心力模型
    const forceSimulation = d3.forceSimulation()
      .force('link',d3.forceLink())
      .force('charge',d3.forceManyBody())
      .force('center',d3.forceCenter());

    // 力导向图数据,由于原始数据不能满足d3对力导向图的数据要求,需要另外重新生成数据
    // 生成节点数据
    forceSimulation.nodes(nodes)
      .on('tick',ticked);

    // 生成边数据
    forceSimulation.force('link')
      .links(edges)
      .distance(d => d.value*100);

    // 设置图形中心位置
    forceSimulation.force('center')
      .x(width/2)
      .y(height/2);
    console.log(nodes);
    console.log(edges);

    // 绘制线
    const links = g.append('g')
      .selectAll('line')
      .data(edges)
      .enter()
      .append('line')
      .attr('stroke',(d,i) => colorScale(i));

    // 绘制文字
    const linksText = g.append('g')
      .selectAll('text')
      .data(edges)
      .enter()
      .append('text')
      .text(d => d.relation);

    // 绘制圆点
    const gs = g.selectAll('.circleText')
      .data(nodes)
      .enter()
      .append('g')
      .attr('transform',d => `translate(${d.x},${d.y})`)
      .call(
        d3.drag()
          .on('start',started)
          .on('drag',dragged)
          .on('end',ended)
      );
    gs.append('circle')
      .attr('r',10)
      .attr('fill', (d,i) => colorScale(i));
    gs.append('text')
      .attr('x',-10)
      .attr('y',-20)
      .attr('dy',10)
      .text(d => d.name);

    function ticked() {
      links.attr('x1',d => d.source.x)
        .attr('y1',d => d.source.y)
        .attr('x2',d => d.target.x)
        .attr('y2',d => d.target.y);

      linksText.attr('x',d => (d.source.x+d.target.x)/2)
        .attr('y', d => (d.source.y + d.target.y) /2);
      gs.attr('transform',d => `translate(${d.x},${d.y})`)
    }

    function started(d){
      if(!d3.event.active){
        forceSimulation.alphaTarget(1).restart(); // 设置衰减系数，对节点位置移动过程的模拟，数值越高移动越快，数值范围[0，1]
      }
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(d){
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
    function ended(d) {
      if (!d3.event.active) {
        forceSimulation.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;

    }

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


export default Force
