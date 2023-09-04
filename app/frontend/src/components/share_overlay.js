import MessageOverlay from './message_overlay';
import ShareButton from './share_button';

export default function ShareOverlay(props) {
  return (
    <MessageOverlay overlayId="share-overlay">
      <ShareButton slug={ props.slug } type="copy" />
      <ShareButton slug={ props.slug } type="email" />
      <ShareButton slug={ props.slug } type="discord" />
      <ShareButton slug={ props.slug } type="facebook" />
      <ShareButton slug={ props.slug } type="linkedin" />
      <ShareButton slug={ props.slug } type="mastodon" />
      <ShareButton slug={ props.slug } type="reddit" />
      <ShareButton slug={ props.slug } type="twitter" />
    </MessageOverlay>
  )
}
