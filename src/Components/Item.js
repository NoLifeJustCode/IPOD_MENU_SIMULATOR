import React from 'react'
/**
 * This is the item within a list 
 * 
 */
class Item extends React.Component{
   

    
    render(){
        let active =this.props.active?'hover':'';
        return (

        <div className={`item ${active}`}>
            {this.props.name}
          </div>
        );
    }
}
export default Item;