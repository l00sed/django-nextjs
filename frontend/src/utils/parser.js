import parse from 'html-react-parser'

export default function Parse(input) {      // Code syntax highlighting
  const result = parse( input );
  return result;
}
