import React from 'react';
import { 
    AbsoluteFill, 
    Series, 
    interpolate, 
    useCurrentFrame, 
    useVideoConfig, 
    spring, 
    OffthreadVideo, 
    Img 
} from 'remotion';
import { ThreadsCard } from '../components/ThreadsCard';

export const ThreadsRising: React.FC<any> = ({ backgroundUrl, posts = [] }) => {
    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>
            {/* 1. Video nền */}
            <AbsoluteFill>
                {backgroundUrl && (
                    <OffthreadVideo 
                        src={backgroundUrl} 
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover', 
                            opacity: 0.4 
                        }}
                    />
                )}
            </AbsoluteFill>

            {/* 2. Grid trang trí */}
            <AbsoluteFill style={{ 
                backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                backgroundSize: '60px 60px',
                opacity: 0.15
            }} />

            {/* 3. Danh sách bài đăng */}
            <Series>
                {posts.map((post: any, index: number) => {
                    const mediaSrc = post.supportingMediaUrl;
                    const isGif = mediaSrc?.toLowerCase().endsWith('.gif') || mediaSrc?.includes('giphy.com') || mediaSrc?.includes('tenor.com');

                    return (
                        <Series.Sequence key={index} durationInFrames={150}>
                            <AbsoluteFill style={{
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                {/* CHỈ BỌC ANIMATION CHO THREADS CARD (Từ cảnh 2 trở đi: index !== 0) */}
                                <RisingAnimation animate={index !== 0}>
                                    {/* Tự động bật chế độ Reply (có thanh nối, ẩn Follow) từ cảnh 2 trở đi */}
                                    <ThreadsCard {...post} isReply={index !== 0} />
                                </RisingAnimation>
                                
                                {/* KHUNG MEDIA BỔ TRỢ PHÍA DƯỚI: CỐ ĐỊNH HOÀN TOÀN Ở MỌI CẢNH */}
                                {mediaSrc && (
                                    <div style={{
                                        positin: 'relative',
                                        zIndex: 10,
                                        marginTop: '28px',
                                        width: '900px',             // Đồng bộ 900px với ThreadsCard
                                        height: '520px',
                                        borderRadius: '24px',
                                        overflow: 'hidden',
                                        border: '4px solid #ffffff',
                                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
                                        backgroundColor: '#111',
                                        boxSizing: 'border-box'
                                    }}>
                                        {isGif ? (
                                            <Img 
                                                src={mediaSrc} 
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                                            />
                                        ) : (
                                            <OffthreadVideo 
                                                src={mediaSrc} 
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                                            />
                                        )}
                                    </div>
                                )}
                            </AbsoluteFill>
                        </Series.Sequence>
                    );
                })}
            </Series>
        </AbsoluteFill>
    );
};

// Component xử lý hiệu ứng trồi riêng cho Card
const RisingAnimation: React.FC<{children: React.ReactNode, animate: boolean}> = ({ children, animate }) => {
    const frame = useCurrentFrame();
    const { fps, height } = useVideoConfig();

    // Nếu animate = true, kích hoạt hiệu ứng nảy lò xo
    const spr = animate ? spring({ 
        frame, 
        fps, 
        config: { damping: 16, stiffness: 100 } 
    }) : 1;
    
    // Trồi từ dưới lên vị trí mặc định
    const translateY = animate ? interpolate(spr, [0, 1], [height / 2, 0]) : 0;
    const opacity = animate ? interpolate(spr, [0, 0.4], [0, 1]) : 1;
    const scale = animate ? interpolate(spr, [0, 1], [0.95, 1]) : 1;

    return (
        <div style={{ 
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center',
            width: '100%',
            transform: `translateY(${translateY}px) scale(${scale})`,
            opacity: opacity
        }}>
            {children}
        </div>
    );
};
