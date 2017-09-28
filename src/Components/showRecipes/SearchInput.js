import React, {Component} from 'react';
import Autocomplete from 'react-autocomplete';


class SearchInput extends Component {

constructor (props) {
    super(props)
    this.state = {
      value: ''
   

    }

  }

  render() {
  const items = this.props.ingredients.map(item =>{
  return { id: item , label: item }
})

    return (
   
    <div className="autocomplete">
          <label className="col-form-label" htmlFor="autocomplete"></label>
       <Autocomplete
        items ={items}
     
        getItemValue={item => item.label}
        inputProps={{ placeholder: ' Sök recept efter ingrediens...', className:'auto-input'}}
        renderItem={(item, isHighlighted) =>
          <div
            
            key={item.id}
            className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
          >
            {item.label}
          </div>
        }
        value={this.state.value}
        onChange={e => this.setState({ value: e.target.value })}
        onSelect={value =>  this.setState({value},function(){
          this.props.onSubmit(this.state.value)
        })}
        
      /> 
  
  
       </div>
     
    )
  }
}

export default SearchInput;