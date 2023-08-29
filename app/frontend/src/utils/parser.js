import parse from 'html-react-parser'

export default function Parse(input, truncate=false) {
  if (input) {
    if (truncate) {
      if (parseInt(truncate) > 1) {
        input = input.toString().slice(0, truncate+1);
      } else {
        input = input.toString().slice(0, 126);
      }
      input = `${ input }...`
    }
    return parse(input)
  } else {
    return
  }
}

export const parseTitle = (element) => {
  // This is a nightmare...
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
