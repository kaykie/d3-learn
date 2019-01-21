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
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout
