export default function TableWrapper(props) {
  let style = false;
  if (props.width) {
    let w = props.width;
    if (/^\d+$/.test(w)) { // Width contains only numbers
      w += 'px';
    }
    style = {
      width: w,
    }
  }

  if (style) {
    return (<div style={ style }>{ props.children }</div>)
  } else {
    return (<>{ props.children }</>)
  }
}
