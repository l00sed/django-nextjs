import Parser from 'html-react-parser'

export default function Parse(input) {      // Code syntax highlighting
  const result = Parser( input );
  return result;
}
