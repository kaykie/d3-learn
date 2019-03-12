/**
 * Created by apple on 2019/1/16.
 */
import React,{Component} from 'react'
import {Link} from 'dva/router'

class Layout extends Component{



  render(){

    return(
      <div className="layout">
        <Link to='/' replace>首页</Link>
        <Link to="/selection" replace>section页面</Link>
        <Link to="/line" replace>柱状图</Link>
        <Link to="/graph" replace>关系图</Link>
        <Link to="/simpleChart" replace>简单图表</Link>
        <Link to="/scale" replace>理解比例尺</Link>
        <Link to="/axis" replace>坐标轴</Link>
        <Link to="/dynamicLine" replace>动态柱状图</Link>
        <Link to="/pie" replace>饼状图</Link>
        <Link to="/force" replace>力导向图</Link>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout
