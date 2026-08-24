import { Composition, getInputProps } from 'remotion';
import { ThreadsRising } from './templates/ThreadsRising';

export const RemotionRoot: React.FC = () => {
    const inputProps = (getInputProps() || {}) as any;
    
    // Bóc tách chính xác videoData từ JSON của n8n
    const data = inputProps.videoData || {};
    const posts = data.posts || [];
    
    const fps = 30;
    // 150 frames (5 giây) cho mỗi bài đăng
    const durationInFrames = Math.max(posts.length * 150, 150);

    return (
        <Composition
            id="MainVideo"
            component={ThreadsRising}
            durationInFrames={durationInFrames}
            fps={fps}
            width={1080}
            height={1920}
            // Truyền object data (chứa backgroundUrl và posts) vào Template
            defaultProps={data}
        />
    );
};
