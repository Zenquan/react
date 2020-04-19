import Component from './Component'

const React = {
  Component,
  createElement
}

function createElement (tag, attrs, ...children) {
  return {
    tag, 
    attrs,
    children
  }
}

export default React