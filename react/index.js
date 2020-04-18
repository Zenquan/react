class React {
  static createElement (tag, attrs, ...children) {
    return {
      tag, 
      attrs,
      children
    }
  }
}

export default React