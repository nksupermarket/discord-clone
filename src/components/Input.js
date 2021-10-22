import React, { Component } from 'react';

class Input extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange && this.props.onChange(e.target.value);
  }

  render() {
    const { className, type, name, placeholder, onKeyDown } = this.props;

    return (
      <input
        type={type}
        name={name}
        className={className}
        placeholder={placeholder}
        onChange={this.handleChange}
        onKeyDown={onKeyDown}
      />
    );
  }
}

export default Input;
