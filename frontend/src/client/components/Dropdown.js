/* global module */

import React from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";

import "./Dropdown.css";

class Dropdown extends React.Component {
  static propTypes = {
    choices: PropTypes.array,
    initial: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    onChange: PropTypes.func,
    optional: PropTypes.bool,
    prettyName: PropTypes.string
  };

  state = {
    active: false,
    current: ""
  };

  constructor(props) {
    super(props);
    this.onChoiceClick = this.onChoiceClick.bind(this);
  }

  componentDidMount() {
    this.setState({ current: this.props.initial === null ? "None" : this.props.initial });
    console.log(this.state);
    console.log(this.props.initial);
  }

  onChoiceClick(option) {
    this.setState({ current: option });
    this.props.onChange(option);
  }

  render() {
    const choices = this.props.optional
      ? ["None", ...this.props.choices]
      : this.props.choices;

    const options = choices.map(option => {
      return (
        <li key={option} onClick={() => this.onChoiceClick(option)}>
          {option}
        </li>
      );
    });

    return (
      <div
        className={`widget dropdown ${this.state.active ? " active" : ""}`}
        onClick={() => this.setState({ active: !this.state.active })}
      >
        <span>
          <b>{this.props.prettyName}</b>: {this.state.current}
        </span>
        <ul className="dropdown-items">{this.state.active && options}</ul>
      </div>
    );
  }
}

export default hot(module)(Dropdown);
