import React from 'react';
import { 
    AbsoluteFill, 
    Series, 
    interpolate, 
    useCurrentFrame, 
    useVideoConfig, 
    spring, 
    OffthreadVideo, 
    Img, 
    staticFile 
} from 'remotion';

export const ThreadsRisingScreenshot: React.FC<any> = ({ backgroundUrl, posts = [] }) => {
    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>
            {/* 1. Video nền mờ phía sau */}
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

            {/* 2. Lưới Grid trang trí (Vibe Threads) */}
            <AbsoluteFill style={{ 
                backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                backgroundSize: '60px 60px',
                opacity: 0.15
            }} />

            {/* 3. Danh sách các bài đăng */}
            <Series>
                {posts.map((post: any, index: number) => {
                    const mediaSrc = post.supportingMediaUrl;
                    const isGif = mediaSrc?.toLowerCase().endsWith('.gif') || mediaSrc?.includes('giphy.com') || mediaSrc?.includes('tenor.com');

                    return (
                        <Series.Sequence key={index} durationInFrames={150}>
                            {/* Bài đầu tiên (index 0) đứng yên, các bài sau trồi lên */}
                            <RisingAnimation animate={index !== 0}>
                                
                                {/* ẢNH CHỤP THREADS THỰC TẾ: Lấy từ thư mục public/ */}
                                <div style={{
                                    width: '90%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                                    borderRadius: '24px',
                                    overflow: 'hidden'
                                }}>
                                    <Img 
                                        src={staticFile(`post_${index}.png`)} 
                                        style={{ width: '100%' }} 
                                    />
                                </div>
                                
                                {/* VIDEO/GIF BỔ TRỢ PHÍA DƯỚI (Dán viền trắng xịn) */}
                                {mediaSrc && (
                                    <div style={{
                                        marginTop: '35px',
                                        width: '850px',
                                        height: '550px',
                                        borderRadius: '28px',
                                        overflow: 'hidden',
                                        border: '6px solid #fff', // Viền trắng dày nổi bật
                                        boxShadow: '0 25px 70px rgba(0,0,0,0.6)',
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

// Thành phần xử lý Animation trồi lên (Spring nảy nhẹ)
const RisingAnimation: React.FC<{children: React.ReactNode, animate: boolean}> = ({ children, animate }) => {
    const frame = useCurrentFrame();
    const { fps, height } = useVideoConfig();

    // Nếu animate=false (bài 1), spr luôn = 1. Nếu true, chạy từ 0 -> 1.
    const spr = animate ? spring({ 
        frame, 
        fps, 
        config: { damping: 16, stiffness: 100 } 
    }) : 1;
    
    // Di chuyển từ dưới lên trung tâm
    const translateY = animate ? interpolate(spr, [0, 1], [height / 1.5, 0]) : 0;
    const opacity = animate ? interpolate(spr, [0, 0.4], [0, 1]) : 1;
    const scale = animate ? interpolate(spr, [0, 1], [0.95, 1]) : 1;

    return (
        <AbsoluteFill style={{ 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center',
            transform: `translateY(${translateY}px) scale(${scale})`,
            opacity: opacity
        }}>
            {children}
        </AbsoluteFill>
    );
};
