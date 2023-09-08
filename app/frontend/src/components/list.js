import ListItem from './list_item';

import styles from '../styles/List.module.scss';
import books from '../data/books.json';

export default function List(props) {
  let list = [];

  if (props.data) {
    const type = props.data.split('.')[0];
    const dataKey = props.data.split('.')[1];

    switch (type) {
      case "books":
        books[dataKey].forEach(book => {
          list.push(<ListItem type={ type } dataKey={ dataKey } data={ book } />)
        });
        break;
    }
  }

  if (list.length) {
    list = <ul className={ styles.list }>{ list }</ul>
    return list
  }
}
