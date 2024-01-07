import Button from 'components/button.jsx';
import ImageWrapper from 'components/image_wrapper.jsx';
import { parseTitle, parseDescription } from 'utils/parser';
import Link from 'next/link';


export default function Featured ({ element }) {
  let featuredClass = [
    'm-auto',
    'flex',
    'rounded-lg',
    'max-w-3xl',
    'h-240',
    'sm:h-144',
    'relative',
    'gradient-shadow',
  ].join(' ');

  let outerClass = [
    'relative',
    'z-10',
    'my-auto',
    'outer-sheen',
    'border',
    'border-solid',
    'border-black',
    'dark:border-white',
  ].join(' ');

  let innerClass = [
    'inner-sheen',
    'flex',
    'flex-col',
    'sm:flex-row',
    'gap-8',
    'p-4',
    'sm:p-8',
  ].join(' ');

  let titleDescClass = [
    'flex',
    'flex-col',
    'justify-center',
    'gap-8',
    'sm:w-2/3'
  ].join(' ');

  let titleClass = [
    'uppercase',
    'text-5xl',
    'font-bold',
    'mt-0',
    'after:top-4'
  ].join(' ');

  let imageClass = [
    'w-auto',
    'h-full',
    'sm:w-1/3'
  ].join(' ');

  const title = parseTitle(element);
  const desc = parseDescription(element);
  const alt = element.image_alt;
  const src = element.featured_image;

  return (
    <div className={ featuredClass }>
      <div className={ outerClass }>
        <div className={ innerClass }>
          <div className={ imageClass }>
            <ImageWrapper
              alt={ alt }
              src={ src }
              width={ 600 }
              height={ 700 }
              visible={ false }
              type="featured"
              imgClass="sm:h-96 max-h-full rounded object-cover"
              sizes="(max-width: 576px)  100vw,
                     (max-width: 768px)  50vw,
                     (max-width: 1200px) 33vw,
                     15vw"
            />
          </div>
          <div className={ titleDescClass }>
            <h2 className={ titleClass }>{ title }</h2>
            <div className="text-lg font-mono">{ desc }</div>
            <Link href={ element.slug }>
              <Button type='standard'>Read { title }</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
