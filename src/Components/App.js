import React from 'react';

import Control from './Control';
import List from './List'
import Display from './Display';
class App extends React.Component {

        /**
         * 
         * @param  props 
         * constructor inits MusicList i.e childMenu and The main Menu
         * state={
         *  index: to track the index of item in a menu,
         *  ListLength: Length of menu list to calculate mod,
         *  angle: to determine speed of movement of focus on item in list,
         *  inc:1/angle,
         *  MenuList:Menu shown,
         *  content:display content on screen 
         * }
         */
        constructor(props){
          super(props)
          this.MusicList=[
            {
              content:"Artist",
              img:''
            },{
              content:"All Songs",
              img:'',
              opacity:'0'

            },{
              content:"PlayList",
              img:''
            }]

          this.Lists={
            MainMenu:[
              {
                content:"Music",
                childMenu:this.MusicList
                
              },{
                content:"Games",
                img:''
              },{
                content:"CoverFlow",
                img:''
              },{
                content:"Setting",
                img:''
              }
            ],
          }
          this.state={
            index:0,
            ListLength:1,
            angle:30,
            inc:1.0/25,
            stack:[this.Lists.MainMenu],
            MenuList:[],
            content:null,
          }
        }
        
        /**
         * This handles the navigation within a menuList i.e switching focus from one item to another
         * index tracks the item and switching occurs accordingly 
         * on every successful event fired the index is incremented by state.inc 
         * so parseInt(index) will give the appropriate index
         */
        listNav=(event)=>{
            let dis=event.detail.distanceFromLast
           
            this.setState((state,props)=>{
             
              return this.incIndex(state,props,dis*state.inc)
            })
        }
        incIndex=(state,props,dis)=>{
        
          let index=state.index+state.ListLength+dis;
          index%=state.ListLength;
          
          
          
          return {
            index
          }
        }

        /**
         * Menu Click is the handler for the menu button this basically opens the menu and will retrieve the menuList from the stack,
         * Menu list are pushed into to stack to track back the menuList display
         */
        MenuClickHandler=()=>{
         
          this.setState((state)=>this.Menu(state))
    
        }
        Menu=(state)=>{
          let stack=[]
          Object.assign(stack,this.state.stack)
          let MenuList=stack.length!=0?stack.pop():[];
          let content=null
          if(MenuList.length==0)
              stack.push(this.Lists.MainMenu)
        
          
          return {
            index:0,
            stack,
            MenuList,
            content,
            ListLength:MenuList.length+1,
            
          }
        }
        /**
         * Select handler handles the selection of a item within a menuList ,
         * if a childMenu is present in a item then that menuList is rendered else 
         * content of the item is displayed in the screen
         */
        selectHandler=(event)=>{
          let index=parseInt(this.state.index)-1;
         
          if(this.state.MenuList[index])
            this.setState((state)=>{
                if(state.MenuList[index].childMenu)
                  {
                    return this.switchMenu(state,index)
                  }
                return this.select(state,index)

            })
        }
        select=(state,index)=>{
            let stack=[]
            Object.assign(stack,state.stack)
            stack.push(state.MenuList)
            return {
              content:state.MenuList[index],
              stack,
              MenuList:[]
            }
        }
        switchMenu=(state,index)=>{
          let stack=[]
          Object.assign(stack,state.stack)
          stack.push(state.MenuList)
          return {
            MenuList:state.MenuList[index].childMenu,
            stack,
          }
        }
        render(){
          let index=parseInt(this.state.index)-1;
         
    
        return (
          <div id="ipod"> 
          <div id="display" >
          {this.state.content&&<Display {...this.state.content}/>}
          {this.state.MenuList.length!=0&&<List Header={"IPOD"} index={index} List={this.state.MenuList} />}
          </div>
          <Control wheel={this.listNav} menuClick={this.MenuClickHandler} selectClick={this.selectHandler}/>
          </div>
        );
        }
}

export default App;
