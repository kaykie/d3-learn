import React,{Component} from 'react';
import * as d3 from 'd3';
const dataset = {
  name: "中国",
  children: [
    {
      name: "浙江",
      children: [
        {name: "杭州", value: 100},
        {name: "宁波", value: 100},
        {name: "温州", value: 100},
        {name: "绍兴", value: 100}
      ]
    },
    {
      name: "广西",
      children: [
        {
          name: "桂林",
          children: [
            {name: "秀峰区", value: 100},
            {name: "叠彩区", value: 100},
            {name: "象山区", value: 100},
            {name: "七星区", value: 100}
          ]
        },
        {name: "南宁", value: 100},
        {name: "柳州", value: 100},
        {name: "防城港", value: 100}
      ]
    },
    {
      name: "黑龙江",
      children: [
        {name: "哈尔滨", value: 100},
        {name: "齐齐哈尔", value: 100},
        {name: "牡丹江", value: 100},
        {name: "大庆", value: 100}
      ]
    },
    {
      name: "新疆",
      children:
        [
          {name: "乌鲁木齐"},
          {name: "克拉玛依"},
          {name: "吐鲁番"},
          {name: "哈密"}
        ]
    }
  ]
}

class Tree extends Component{

  componentDidMount() {
    const marge = {top:50, bottom:0, left:10, right:0},
      svg = d3.select("svg"), width = svg.attr("width"), height = svg.attr("height"),
      g = svg.append("g")
        .attr('transform',`translate(${marge.top},${marge.left})`);
    const hierarchyData = d3.hierarchy(dataset);
    console.log(hierarchyData)
    const tree = d3.tree()
      .size([width-400,height-200])
      // .separation((a, b) => a.parent === b.parent ? 1 : 2);
    const treeData = tree(hierarchyData);
    console.log(treeData);
    const nodes = hierarchyData.descendants();
    const links = hierarchyData.links();
    console.log(nodes,links);
    const Bezier = d3.linkHorizontal()
      .x(d => d.y)
      .y(d => d.x);
    g.append('g')
      .selectAll('path')
      .data(links)
      .enter()
      .append('path')
      .attr('d',d => {
        console.log(d);
        const source = {x:d.source.x,y:d.source.y};
        const target = {x:d.target.x,y:d.target.y};
        return Bezier({source,target})
      })
      .attr('fill','none')
      .attr('stroke','red')
      .attr('stroke-width',1);
    const gs = g.append('g')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('transform',d => `translate(${d.y},${d.x})`);
    gs.append('circle')
      .attr('r',6)
      .attr('fill','white')
      .attr('stroke','black')
      .attr('stroke-width',1);
    gs.append('text')
      .attr('x',d => d.children ? -40:8)
      .attr('y',0)
      .attr('dy',5)
      .text(d => d.data.name)
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

export default Tree
