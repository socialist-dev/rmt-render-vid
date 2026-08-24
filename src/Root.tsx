import { Composition, getInputProps } from 'remotion';
import { ThreadsRising } from './templates/ThreadsRising';

export const RemotionRoot: React.FC = () => {
    const inputProps = (getInputProps() || {}) as any;
    
    // Lấy videoData từ n8n payload
    const videoData = inputProps.videoData || {};
    const posts = videoData.posts || [];
    
    const fps = 30;
    // Mỗi bài đăng 150 frames (5 giây)
    const durationInFrames = Math.max(posts.length * 150, 150);

    return (
        <>
            <Composition
                id="MainVideo"
                component={ThreadsRising}
                durationInFrames={durationInFrames}
                fps={fps}
                width={1080}
                height={1920}
                // Truyền toàn bộ inputProps để ThreadsRising nhận được videoData
                defaultProps={inputProps} 
            />
        </>
    );
};
