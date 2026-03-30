import NextImage, { ImageProps } from 'next/image'

const basePath = process.env.NODE_ENV === 'production' ? '/Coallingo' : ''

export default function CustomImage(props: ImageProps) {
    // Auto-prefix src with basePath for static assets in production
    let src = props.src
    if (typeof src === 'string' && src.startsWith('/') && !src.startsWith(basePath + '/')) {
        src = `${basePath}${src}`
    }

    return <NextImage {...props} src={src} />
}
