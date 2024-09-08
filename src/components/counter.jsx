import React, { Component } from "react";

export default class Counter extends Component {
  render() {
    return (
      <div>
        <span style={{ fontSize: 18 }} className="badge bg-warning m-1">
          {this.Number()}
        </span>

        <button
          onClick={() => this.props.onIncrement(this.props.counter)}
          className="btn btn-primary btn-sm"
        >
          +
        </button>

        <button
          onClick={() => this.props.onDecrement(this.props.counter)}
          className="btn btn-secondary m-2 btn-sm"
          disabled={this.props.counter.value === 0 ? "disabled" : ""}
        >
          -
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger btn-sm m-2"
        >
          X
        </button>

        <ul></ul>
      </div>
    );
  }

  Number() {
    const { value: count } = this.props.counter;
    return count === 0 ? "0" : count;
  }
}
