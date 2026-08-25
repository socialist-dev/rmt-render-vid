import { AbsoluteFill, Series, interpolate, useCurrentFrame, useVideoConfig, spring, OffthreadVideo, Img } from 'remotion';
import { ThreadsCard } from '../components/ThreadsCard';

export const ThreadsRising: React.FC<any> = ({ backgroundUrl, posts = [] }) => {
    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>
            {/* 1. Video nền */}
            <AbsoluteFill>
                {backgroundUrl && (
                    <OffthreadVideo 
                        src={backgroundUrl} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
                    />
                )}
            </AbsoluteFill>

            {/* 2. Grid trang trí */}
            <AbsoluteFill style={{ 
                backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                backgroundSize: '60px 60px',
                opacity: 0.1
            }} />

            {/* 3. Danh sách bài đăng */}
            <Series>
                {posts.map((post: any, index: number) => {
                    const mediaSrc = post.supportingMediaUrl;
                    const isGif = mediaSrc?.toLowerCase().endsWith('.gif') || mediaSrc?.includes('giphy.com') || mediaSrc?.includes('tenor.com');

                    return (
                        <Series.Sequence key={index} durationInFrames={150}>
                            {/* QUAN TRỌNG: Chỉ truyền hiệu ứng trồi lên cho các bài từ thứ 2 trở đi (index > 0) */}
                            <RisingAnimation animate={index !== 0}>
                                <ThreadsCard {...post} />
                                
                                {mediaSrc && (
                                    <div style={{
                                        marginTop: '30px',
                                        width: '900px',
                                        height: 'auto',
                                        borderRadius: '24px',
                                        overflow: 'hidden',
                                        border: '5px solid #fff',
                                        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                                        backgroundColor: '#111'
                                    }}>
                                        {isGif ? (
                                            <Img src={mediaSrc} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <OffthreadVideo src={mediaSrc} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        )}
                                    </div>
                                )}
                            </RisingAnimation>
                        </Series.Sequence>
                    );
                })}
            </Series>
        </AbsoluteFill>
    );
};

// Component xử lý hiệu ứng động
const RisingAnimation: React.FC<{children: React.ReactNode, animate: boolean}> = ({ children, animate }) => {
    const frame = useCurrentFrame();
    const { fps, height } = useVideoConfig();

    // Nếu animate = true (các bài sau), dùng spring. Nếu false (bài đầu), ép giá trị về 1 (đã hoàn thành animation)
    const spr = animate ? spring({ 
        frame, 
        fps, 
        config: { damping: 15, stiffness: 100 } 
    }) : 1;
    
    // Nếu animate = true, trồi từ dưới lên. Nếu false, đứng yên (translateY = 0)
    const translateY = animate ? interpolate(spr, [0, 1], [height / 1.5, 0]) : 0;
    const opacity = animate ? interpolate(spr, [0, 0.4], [0, 1]) : 1;

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
