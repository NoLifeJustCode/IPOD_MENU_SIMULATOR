import React from 'react';
import Item from './Item'
/**
 * This component creates a list of items
 */
class List extends React.Component{
     
        
        render(){
            let List=this.props.List
            return (

        <div id="menuList">
        <div className="header">
            {this.props.Header} 
        </div>
        <div id ="list" className="list">
          {
          List.map((item,index)=>{
                return <Item key={index} name={item.content} active={index==this.props.index} />
          })
          }
        </div>
      </div>
            );
        }
}



export default List