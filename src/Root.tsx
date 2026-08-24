import { Composition, getInputProps } from 'remotion';
import { ThreadsRising } from './templates/ThreadsRising';

export const RemotionRoot: React.FC = () => {
    const inputProps = (getInputProps() || {}) as any;
    
    // Tìm mảng posts ở mọi nơi có thể (trực tiếp hoặc trong videoData)
    const posts = inputProps.videoData?.posts || inputProps.posts || [];
    
    const fps = 30;
    // Mỗi bài đăng 5 giây (150 frames)
    const durationInFrames = Math.max(posts.length * 150, 150);

    return (
        <Composition
            id="MainVideo"
            component={ThreadsRising}
            durationInFrames={durationInFrames}
            fps={fps}
            width={1080}
            height={1920}
            // Truyền tất cả vào để Template tự bóc tách
            defaultProps={inputProps}
        />
    );
};
