import { AbsoluteFill, Series, interpolate, useCurrentFrame, useVideoConfig, spring, OffthreadVideo, Img } from 'remotion';
import { ThreadsCard } from '../components/ThreadsCard';

export const ThreadsRising: React.FC<any> = ({ backgroundUrl, posts = [] }) => {
    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>
            {/* 1. Video nền mờ phía sau */}
            <AbsoluteFill>
                {backgroundUrl && (
                    <OffthreadVideo 
                        src={backgroundUrl} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
                    />
                )}
            </AbsoluteFill>

            {/* 2. Lưới Grid trang trí */}
            <AbsoluteFill style={{ 
                backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                backgroundSize: '60px 60px',
                opacity: 0.1
            }} />

            {/* 3. Luồng bài đăng trồi lên */}
            <Series>
                {posts.map((post: any, index: number) => {
                    const mediaSrc = post.supportingMediaUrl;
                    // Tự động kiểm tra xem n8n gửi GIF hay Video
                    const isGif = mediaSrc?.toLowerCase().endsWith('.gif') || mediaSrc?.includes('giphy.com') || mediaSrc?.includes('tenor.com');

                    return (
                        <Series.Sequence key={index} durationInFrames={150}>
                            <RisingAnimation>
                                {/* Card bài đăng Threads (Dark UI) */}
                                <ThreadsCard {...post} />
                                
                                {/* Khu vực GIF/Video bổ trợ phía dưới */}
                                {mediaSrc && (
                                    <div style={{
                                        marginTop: '30px',
                                        width: '850px',
                                        height: '550px',
                                        borderRadius: '24px',
                                        overflow: 'hidden',
                                        border: '5px solid #fff', // Viền trắng nổi bật
                                        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                                        backgroundColor: '#111'
                                    }}>
                                        {isGif ? (
                                            <Img 
                                                src={mediaSrc}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <OffthreadVideo 
                                                src={mediaSrc}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
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

const RisingAnimation: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const frame = useCurrentFrame();
    const { fps, height } = useVideoConfig();
    const spr = spring({ frame, fps, config: { damping: 15, stiffness: 100 } });
    
    // Hiệu ứng trồi lên mượt mà
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
