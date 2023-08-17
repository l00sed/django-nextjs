import parse from 'html-react-parser'

export default function Parse(input) {      // Code syntax highlighting
  if (input) {
    return parse(input)
  } else {
    return
  }
}

export const parseTitle = (element) => {
  let long_titles = {
    "abstract": <>Abstract&shy;ions II</>,
    "microfactory-2": <>Micro&shy;fact&shy;ory 02</>
  }
  if (Object.keys(long_titles).includes(element.slug)) {
    return long_titles[element.slug]
  } else {
    return element.title
  }
}
