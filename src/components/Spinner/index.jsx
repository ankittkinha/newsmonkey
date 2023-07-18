import React, { Component } from 'react';
import spinner from "./../../images/Rolling-1s-200px.gif";

export default class index extends Component {
  render() {
    return (
      <div className='text-center xy'>
        <img src={spinner} alt='loading' />
      </div>
    )
  }
}
