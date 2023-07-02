import parse from 'html-react-parser'

export default function Parse(input) {      // Code syntax highlighting
  if (input) {
    return parse(input)
  } else {
    return
  }
}
