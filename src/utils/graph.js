/**
 * Created by apple on 2019/1/15.
 */
import * as d3 from 'd3'
class graph{

  static async lineGeneratr(data){
    console.log(d3.svg);
    console.log(data);
    let line = await d3.svg();
    line.line(data)
      .x((d,i)=>i)
      .y((d,i)=>d)
  }

}


export default graph
