import { notFound } from 'next/navigation';

export default function notFoundWrapper(props) {
  if (props.message) {
    if (props.level) {
      switch (props.level) {
        default:
          console.log(props.message);
        case 'info':
          console.info(props.message);
        case 'warn':
          console.warn(props.message);
        case 'error':
          console.error(props.message);
      }
    }
  }
  notFound();
}
