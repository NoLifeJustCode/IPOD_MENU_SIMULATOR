import React from 'react'
 
/**
 * Handles the display of content on the screen i.e this acts as the screen to the ipod
 */
class Display extends React.Component{
    
    render(){
        let style={
            backgroundImage:`url(${this.props.img})`,
            backgroundColor:"white",
            height:"100%",
            width:"100%",
            
        }
        if(this.props.opacity)
            style["opacity"]=this.props.opacity
        return(
            <div style={style}>
                {this.props.content}

            </div>
        );
    }
}

export default Display