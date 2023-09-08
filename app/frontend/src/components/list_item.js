import styles from '../styles/ListItem.module.scss';

export default function ListItem(props) {
  if (props.data) {
    if (props.type) {
      switch (props.type) {
        case "books":
          const checked = ['finished'];
          let svg = <></>;
          if (checked.includes(props.dataKey)) {
            svg =
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
                <path fill="currentColor" d="M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM6 26V6h20v20Z"/>
                <path fill="currentColor" d="m14 21.5l-5-4.96L10.59 15L14 18.35L21.41 11L23 12.58l-9 8.92z"/>
              </svg>;
          } else {
            svg =
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
                <path fill="currentColor" d="M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM6 26V6h20v20Z"/>
              </svg>;
          }
          return (
            <li className={ styles.book }>
              <div className={ styles.checklist }>
                { svg }
                <div>
                  <a href={ props.data.href } target="_blank" rel="noopener nofollow noreferrer">{ props.data.title }</a>
                  <p>{ props.data.author }</p>
                </div>
              </div>
            </li>
          )
      }
    }
  }
}
