import { AbsoluteFill, Series, interpolate, useCurrentFrame, useVideoConfig, spring, OffthreadVideo } from 'remotion';
import { ThreadsCard } from '../components/ThreadsCard';

export const ThreadsRising: React.FC<any> = ({ backgroundUrl, posts = [] }) => {
    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>
            <AbsoluteFill>
                {backgroundUrl && (
                    <OffthreadVideo 
                        src={backgroundUrl} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
                    />
                )}
            </AbsoluteFill>

            <AbsoluteFill style={{ 
                backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                backgroundSize: '60px 60px',
                opacity: 0.15
            }} />

            <Series>
                {posts.map((post: any, index: number) => (
                    <Series.Sequence key={index} durationInFrames={150}>
                        <RisingAnimation>
                            {/* Khối bài đăng Threads */}
                            <ThreadsCard {...post} />
                            
                            {/* Khu vực Video/GIF bổ trợ phía dưới (như ảnh mẫu) */}
                            {post.supportingMediaUrl && (
                                <div style={{
                                    marginTop: '30px',
                                    width: '850px',
                                    height: '550px',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    border: '4px solid #fff', // Viền trắng nổi bật giống mẫu
                                    boxShadow: '0 15px 40px rgba(0,0,0,0.5)'
                                }}>
                                    <OffthreadVideo 
                                        src={post.supportingMediaUrl}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            )}
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
    const spr = spring({ frame, fps, config: { damping: 15, stiffness: 100 } });
    
    // Trồi lên từ dưới
    const translateY = interpolate(spr, [0, 1], [height / 1.5, 0]);
    const opacity = interpolate(spr, [0, 0.4], [0, 1]);

    return (
        <AbsoluteFill style={{ 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center',
            transform: `translateY(${translateY}px)`,
            opacity: opacity
        }}>
            {children}
        </AbsoluteFill>
    );
};
