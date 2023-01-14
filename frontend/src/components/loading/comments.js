import comment_styles from '../../styles/Comment.module.css';


export default function LoadingComments() {
  return (
    <>
      <h4 className={ comment_styles.comments_header }>Discussion</h4>
      <div className={ comment_styles.comment_form_wrapper }>
      </div>
    </>
  )
}
