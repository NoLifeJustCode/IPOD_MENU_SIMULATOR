import React from 'react'
import ZingTouch from 'zingtouch'
/**
 * This Component Simulates  the control pad of the ipod
 * Supported Functions :
 * 1.Navigate thru the items within a menuList using the circular pad as mouse i.e circular motion navigates thru the menu
 * 2.Select : the center circular button selects the item within a menu and handles the appropriate action respectively
 * 3.Menu: This opens up the last closed menu
 */
class Control extends React.Component{
    constructor(props){
       super(props)
       this.shuffleRotateHandler=this.shuffleRotateHandler.bind(this)
       this.menuClickHandler=this.menuClickHandler.bind(this)
       this.selectClick=this.selectClick.bind(this)
    }
    componentDidMount(){
        this.region=document.getElementById('ipod-shuffle')

        this.zt=new ZingTouch.Region(this.region)
        this.zt.bind(this.region,"rotate",this.shuffleRotateHandler)
        document.getElementById('select').addEventListener('mousemove',this.mouseMove)
    }

    shuffleRotateHandler(event){
        event.stopPropagation();
        event.preventDefault();
        if(this.props.wheel)
             {  
                 this.props.wheel(event);
             }
     
    }

    menuClickHandler(event){
        event.stopPropagation();
        event.preventDefault();
        if(this.props.menuClick)
            this.props.menuClick(event);
        
    }

    selectClick(event){
        event.stopPropagation();
        event.preventDefault();
        if(this.props.selectClick)
            this.props.selectClick(event);
       
    }
    mouseMove=(event)=>{
        event.stopPropagation();
        
    }
    render(){

        return(

            <div id="ipod-shuffle">
            <button id="menu" onClick={this.menuClickHandler}>menu</button>
            <div id="select"  onClick={this.selectClick} ></div>
            </div>
        );
    }
}

export default Control