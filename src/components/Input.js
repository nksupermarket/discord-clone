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
    const { className, type, placeholder } = this.props;

    return (
      <input
        type={type}
        className={className}
        placeholder={placeholder}
        onChange={this.handleChange}
      />
    );
  }
}

export default Input;
