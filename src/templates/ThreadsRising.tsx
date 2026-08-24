import { AbsoluteFill, Series, interpolate, useCurrentFrame, useVideoConfig, spring, OffthreadVideo } from 'remotion';
import { ThreadsCard } from '../components/ThreadsCard';

export const ThreadsRising: React.FC<any> = (props) => {
    const frame = useCurrentFrame();
    const { height } = useVideoConfig();

    // LOGIC BÓC TÁCH DỮ LIỆU THÔNG MINH
    const data = props.videoData || props; 
    const backgroundUrl = data.backgroundUrl;
    const posts = data.posts || [];
    const title = data.title || "";

    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>
            {/* 1. Background Video */}
            <AbsoluteFill>
                {backgroundUrl ? (
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
                    // Nếu vẫn không thấy URL, hiện màu xám để bạn biết là data chưa vào
                    <div style={{ backgroundColor: '#222', flex: 1, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                        <h1 style={{color: 'white'}}>Waiting for Background URL...</h1>
                    </div>
                )}
            </AbsoluteFill>

            {/* 2. Grid Overlay */}
            <AbsoluteFill style={{ 
                backgroundImage: 'radial-gradient(circle, #ffffff1a 1px, transparent 1px)', 
                backgroundSize: '40px 40px' 
            }} />

            {/* 3. Hiển thị danh sách Posts */}
            <Series>
                {posts.map((post: any, index: number) => (
                    <Series.Sequence key={index} durationInFrames={150}>
                        <RisingAnimation>
                            <ThreadsCard {...post} />
                        </RisingAnimation>
                    </Series.Sequence>
                ))}
            </Series>

            {/* 4. Footer Debug (Dòng chữ bạn thấy ở cuối video) */}
            <div style={{
                position: 'absolute', 
                bottom: 40, 
                width: '100%', 
                textAlign: 'center', 
                color: 'white', 
                fontSize: 30,
                opacity: 0.5
            }}>
                🚀 Render: {title || "No Title Found"}
            </div>
        </AbsoluteFill>
    );
};

// Giữ nguyên phần RisingAnimation bên dưới
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
