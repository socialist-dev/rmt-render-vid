import { AbsoluteFill, Series, interpolate, useCurrentFrame, useVideoConfig, spring, OffthreadVideo } from 'remotion';
import { ThreadsCard } from '../components/ThreadsCard';

export const ThreadsRising: React.FC<any> = (props) => {
    const { backgroundUrl, posts = [] } = props;
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>
            {/* KIỂM TRA: Chỉ render video nếu backgroundUrl là một string hợp lệ */}
            <AbsoluteFill>
                {typeof backgroundUrl === 'string' && backgroundUrl.length > 0 ? (
                    <OffthreadVideo 
                        src={backgroundUrl} 
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover', 
                            opacity: 0.5 
                        }}
                    />
                ) : (
                    // Nếu không có URL, hiện nền đen để không bị báo lỗi Undefined
                    <div style={{ backgroundColor: '#111', flex: 1 }} />
                )}
            </AbsoluteFill>

            <AbsoluteFill style={{ 
                backgroundImage: 'radial-gradient(circle, #ffffff1a 1px, transparent 1px)', 
                backgroundSize: '40px 40px' 
            }} />

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
