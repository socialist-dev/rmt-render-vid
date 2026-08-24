
import { AbsoluteFill, Series, Img, interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';

export const Slideshow = ({ 
    images = [], 
    texts = [] 
}: { 
    images: string[], 
    texts: string[] 
}) => {
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ backgroundColor: 'black' }}>
            <Series>
                {images.map((img, index) => (
                    <Series.Sequence key={index} durationInFrames={90}>
                        <Scene img={img} text={texts[index]} />
                    </Series.Sequence>
                ))}
            </Series>
        </AbsoluteFill>
    );
};

const Scene = ({ img, text }: { img: string, text: string }) => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();
    
    // Hiệu ứng zoom nhẹ cho ảnh
    const scale = interpolate(frame, [0, 90], [1, 1.1]);
    
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
            <Img 
                src={img} 
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: `scale(${scale})`
                }} 
            />
            {/* Lớp phủ Text */}
            <div style={{
                position: 'absolute',
                bottom: 150,
                width: '80%',
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: 'white',
                padding: 40,
                borderRadius: 20,
                fontSize: 50,
                textAlign: 'center',
                fontFamily: 'sans-serif'
            }}>
                {text}
            </div>
        </AbsoluteFill>
    );
};
