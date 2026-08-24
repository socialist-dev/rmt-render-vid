import { AbsoluteFill, Series, interpolate, useCurrentFrame, useVideoConfig, spring, OffthreadVideo } from 'remotion';
import { ThreadsCard } from '../components/ThreadsCard';

export const ThreadsRising: React.FC<any> = (props) => {
    // Dán cứng URL của bạn vào đây làm giá trị mặc định (Fallback)
    const HARDCODED_URL = "https://cdn.pixabay.com/video/2026/01/04/325957_large.mp4";
    
    // Ưu tiên lấy từ n8n, nếu không có thì lấy link dán cứng
    const backgroundUrl = props.backgroundUrl || HARDCODED_URL;
    const posts = props.posts || [];

    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>
            {/* Background Video */}
            <AbsoluteFill>
                <OffthreadVideo 
                    src={backgroundUrl} 
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        opacity: 0.5 
                    }}
                />
            </AbsoluteFill>

            {/* Grid Overlay */}
            <AbsoluteFill style={{ 
                backgroundImage: 'radial-gradient(circle, #ffffff1a 1px, transparent 1px)', 
                backgroundSize: '40px 40px' 
            }} />

            <Series>
                {posts.length > 0 ? posts.map((post: any, index: number) => (
                    <Series.Sequence key={index} durationInFrames={150}>
                        <RisingAnimation>
                            <ThreadsCard {...post} />
                        </RisingAnimation>
                    </Series.Sequence>
                )) : null}
            </Series>
        </AbsoluteFill>
    );
};

const RisingAnimation: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const frame = useCurrentFrame();
    const { fps, height } = useVideoConfig();
    const spr = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
    const translateY = interpolate(spr, [0, 1], [height / 2, 0]);
    const opacity = interpolate(spr, [0, 0.5], [0, 1]);
    const scale = interpolate(spr, [0, 1], [0.9, 1]);

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
