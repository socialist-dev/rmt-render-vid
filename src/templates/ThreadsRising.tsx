import { AbsoluteFill, Video, Series, interpolate, useCurrentFrame, useVideoConfig, spring, Img } from 'remotion';
import { ThreadsCard } from '../components/ThreadsCard';

export const ThreadsRising: React.FC<any> = ({ backgroundUrl, posts = [] }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ backgroundColor: 'black' }}>
            {/* 1. Background Video/GIF */}
            <AbsoluteFill>
                <Video 
                    src={backgroundUrl} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
                    muted
                    loop
                />
            </AbsoluteFill>

            {/* 2. Lớp lưới mờ phía sau bài đăng (Grid overlay giống video mẫu) */}
            <AbsoluteFill style={{ 
                backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                opacity: 0.2
            }} />

            {/* 3. Hiệu ứng trồi lên cho từng bài đăng */}
            <Series>
                {posts.map((post: any, index: number) => (
                    <Series.Sequence key={index} durationInFrames={120}>
                        <RisingContainer>
                            <ThreadsCard {...post} />
                        </RisingContainer>
                    </Series.Sequence>
                ))}
            </Series>
        </AbsoluteFill>
    );
};

const RisingContainer: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const frame = useCurrentFrame();
    const { fps, height } = useVideoConfig();

    // Hiệu ứng trồi lên từ dưới (Spring cho mượt)
    const moveUp = spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 100 }
    });

    const translateY = interpolate(moveUp, [0, 1], [height, 0]);

    return (
        <AbsoluteFill style={{ 
            justifyContent: 'center', 
            alignItems: 'center',
            transform: `translateY(${translateY}px)`
        }}>
            {children}
        </AbsoluteFill>
    );
};
