import { Composition, getInputProps } from 'remotion';
import { ThreadsRising } from './templates/ThreadsRising';

export const RemotionRoot: React.FC = () => {
    const inputProps = (getInputProps() || {}) as any;
    
    // Lấy videoData từ n8n
    const data = inputProps.videoData || {};
    const posts = data.posts || [];
    
    // Tính thời lượng: 150 frames mỗi bài, tối thiểu 150 frames
    const durationInFrames = Math.max(posts.length * 150, 150);

    return (
        <Composition
            id="MainVideo"
            component={ThreadsRising}
            durationInFrames={durationInFrames}
            fps={30}
            width={1080}
            height={1920}
            // Truyền data (chứa backgroundUrl và posts) vào Template
            defaultProps={data}
        />
    );
};
