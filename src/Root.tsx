import { Composition, getInputProps } from 'remotion';
import { ThreadsRisingReact } from './templates/ThreadsRisingReact';
import { ThreadsRisingScreenshot } from './templates/ThreadsRisingScreenshot';

export const RemotionRoot: React.FC = () => {
    const inputProps = (getInputProps() || {}) as any;
    
    // 1. Xác định Template ID từ n8n gửi lên (mặc định dùng screenshot cho xịn)
    const templateId = inputProps.templateId || 'threads-screenshot';
    const videoData = inputProps.videoData || {};
    const posts = videoData.posts || [];
    
    // 2. Chọn Component tương ứng
    const SelectedTemplate = templateId === 'threads-react' 
        ? ThreadsRisingReact 
        : ThreadsRisingScreenshot;

    const fps = 30;
    const durationInFrames = Math.max(posts.length * 150, 150);

    return (
        <Composition
            id="MainVideo"
            component={SelectedTemplate}
            durationInFrames={durationInFrames}
            fps={fps}
            width={1080}
            height={1920}
            defaultProps={videoData}
        />
    );
};
