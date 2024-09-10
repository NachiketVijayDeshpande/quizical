import React from 'react'
import he from 'he'



export default function Asnwers(props){
   var optionelement =[]
    if(props.first && !props.final)
  { 
     optionelement = props.option.map((each)=>{
            return ( 
                <div style={{backgroundColor: each.isSelected?"#D6DBF5":"#F5F7FB"}} onClick={()=>props.click(each.value,props.question)} className="radio-options" id={each.id}>
           
                <label >{he.decode(each.value)}</label>
                </div>)
      })
      
   }
    else if(!props.final){
       optionelement = props.option.sort(() => 0.5 - Math.random()).map((each)=>{
            return ( 
                <div style={{backgroundColor: each.isSelected?"#D6DBF5":"#F5F7FB"}} onClick={()=>props.click(each.value,props.question)} className="radio-options" id={each.id}>
                <label>{he.decode(each.value)}</label>
                </div>)
    })      
    }
    else{
          optionelement = props.option.map((each)=>{
           function styles(){
            if(each.isSelected&&each.isCorrect){
               return {backgroundColor: "#94D7A2" }
            }
            else if(each.isSelected &&!each.isCorrect ){
               return {backgroundColor: "#F8BCBC" }
            }
            else if(each.isCorrect){
               return {backgroundColor: "#94D7A2" }
            }
            else{
               return {color:"grey"}
            }
           }
            
            return ( 
                <div style={styles()} className="radio-options" id={each.id}>
                <label  /*onClick={()=>props.click(each.value,props.question)}*/>{he.decode(each.value)}</label>
                </div>)
    })    
      
    }
    return (
       optionelement
    )
}
