import { AbsoluteFill, Series, interpolate, useCurrentFrame, useVideoConfig, spring, Video, OffthreadVideo } from 'remotion';
import { ThreadsCard } from '../components/ThreadsCard';

export const ThreadsRising: React.FC<any> = ({ backgroundUrl, posts = [] }) => {
    const frame = useCurrentFrame();
    const { fps, height } = useVideoConfig();

    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>
            {/* Background: Hỗ trợ Video hoặc GIF */}
            <AbsoluteFill>
                <OffthreadVideo 
                    src={backgroundUrl} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
                />
            </AbsoluteFill>

            {/* Overlay Grid (Tùy chọn cho "nghệ") */}
            <AbsoluteFill style={{ 
                backgroundImage: 'radial-gradient(circle, #ffffff1a 1px, transparent 1px)', 
                backgroundSize: '40px 40px' 
            }} />

            {/* Luồng bài đăng trồi lên */}
            <Series>
                {posts.map((post: any, index: number) => (
                    <Series.Sequence key={index} durationInFrames={150}>
                        <RisingAnimation>
                            <ThreadsCard {...post} />
                        </RisingAnimation>
                    </Series.Sequence>
                ))}
            </Series>
        </AbsoluteFill>
    );
};

const RisingAnimation: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const frame = useCurrentFrame();
    const { fps, height } = useVideoConfig();

    // Hiệu ứng lò xo trồi lên
    const spr = spring({
        frame,
        fps,
        config: { damping: 14, stiffness: 100 }
    });

    // Đi từ dưới đáy màn hình trồi lên giữa
    const translateY = interpolate(spr, [0, 1], [height / 1.5, 0]);
    const opacity = interpolate(spr, [0, 0.5], [0, 1]);
    const scale = interpolate(spr, [0, 1], [0.8, 1]);

    return (
        <AbsoluteFill style={{ 
            justifyContent: 'center', 
            alignItems: 'center',
            transform: `translateY(${translateY}px) scale(${scale})`,
            opacity: opacity
        }}>
            {children}
        </AbsoluteFill>
    );
};
