import { Composition, getInputProps } from 'remotion';
import { ThreadsRising } from './templates/ThreadsRising';

export const RemotionRoot: React.FC = () => {
    // 1. Lấy dữ liệu từ n8n gửi lên (client_payload)
    const inputProps = (getInputProps() || {}) as any;
    
    // 2. Trích xuất videoData
    const videoData = inputProps.videoData || {};
    
    // 3. Lấy danh sách posts để tính thời lượng
    const posts = videoData.posts || [];
    const fps = 30;
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
                // TRUYỀN THẲNG videoData vào đây. 
                // Khi đó, bên trong ThreadsRising, các biến như backgroundUrl sẽ nằm ở cấp cao nhất của props.
                defaultProps={videoData} 
            />
        </>
    );
};
