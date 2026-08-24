import { Composition, getInputProps } from 'remotion';
import { Slideshow } from './Slideshow';

export const RemotionRoot: React.FC = () => {
    const inputProps = getInputProps();
    
    return (
        <>
            <Composition
                id="MainVideo"
                component={Slideshow}
                durationInFrames={((inputProps.images as string[])?.length || 1) * 90}
                fps={30}
                width={1080}
                height={1920}
                defaultProps={{
                    images: [
                        'https://picsum.photos/id/10/1080/1920',
                        'https://picsum.photos/id/20/1080/1920'
                    ],
                    texts: ['Chào mừng bạn', 'Đây là demo Remotion']
                }}
            />
        </>
    );
};
