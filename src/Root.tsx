import { Composition, getInputProps } from 'remotion';
import { ThreadsRising } from './templates/ThreadsRising';

export const RemotionRoot: React.FC = () => {
    // Lấy dữ liệu từ file input.json (do lệnh --props=./input.json điều khiển)
    const payload = (getInputProps() || {}) as any;
    
    // Bóc tách videoData (cấu trúc n8n gửi: client_payload.videoData)
    const data = payload.videoData || {};
    const posts = data.posts || [];
    
    const fps = 30;
    const durationInFrames = Math.max(posts.length * 150, 150);

    return (
        <Composition
            id="MainVideo"
            component={ThreadsRising}
            durationInFrames={durationInFrames}
            fps={fps}
            width={1080}
            height={1920}
            // Truyền trực tiếp nội dung bên trong videoData vào template
            defaultProps={data}
        />
    );
};
