export default function AutoInput(props) {
  console.log(props.data)
  //console.log(props.data.widget_name)

  let output = <></>

  let id = `id_${props.name}` ?? null;
  let cols = props.data.cols ?? null;
  let maxLength = props.data.maxlength ?? null;
  let placeholder = props.data.placeholder ?? null;
  let required = props.data.required ? true : null;
  let rows = props.data.rows ?? null;

  switch (props.data.widget_name) {
    case 'HiddenInput':
      output = (
        <input
          id={ id }
          name={ props.name }
          required={ required }
          hidden
        />
      )
      break
    case 'TextInput':
      output = (
        <input
          id={ id }
          maxLength={ maxLength }
          name={ props.name }
          placeholder={ placeholder }
          required={ required }
          type="text"
        />
      )
      break
    case 'Textarea':
      output = (
        <textarea
          cols={ cols }
          id={ id }
          maxLength={ maxLength }
          name={ props.name }
          placeholder={ placeholder }
          required={ required }
          rows={ rows }
        ></textarea>
      )
      break
    case 'CheckboxInput':
      output = (
        <input
          id={ id }
          name={ props.name }
          required={ required }
          type="checkbox"
        />
      )
      break
    case 'EmailInput':
      output = (
        <input
          id={ id }
          maxLength={ maxLength }
          name={ props.name }
          placeholder={ placeholder }
          required={ required }
          type="email"
        />
      )
      break
  }
  if (props.data.label) {
    output = (
      <>
        <label htmlFor={ id }>
          { props.data.label }
        </label>
        { output }
      </>
    )
  }

  return output
}
