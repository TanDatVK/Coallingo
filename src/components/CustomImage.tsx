import NextImage, { ImageProps } from 'next/image'

const basePath = process.env.NODE_ENV === 'production' ? '/Coallinggo' : ''

export default function CustomImage(props: ImageProps) {
    const src = typeof props.src === 'string' && props.src.startsWith('/')
        ? `${basePath}${props.src}`
        : props.src

    return <NextImage {...props} src={src} />
}
