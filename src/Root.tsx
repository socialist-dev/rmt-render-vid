import { Composition, getInputProps } from 'remotion';
import { ThreadsRising } from './templates/ThreadsRising';
// Nếu bạn có thêm template khác thì import vào đây

export const RemotionRoot: React.FC = () => {
    // Lấy toàn bộ dữ liệu gửi từ n8n/GitHub Action
    const inputProps = getInputProps() || {};
    
    // 1. Xác định Template (Mặc định là threads-rising)
    const templateId = inputProps.templateId || 'threads-rising';
    
    // 2. Trích xuất videoData (Dùng optional chaining ?. để tránh lỗi null)
    const videoData = inputProps.videoData || {};
    
    // 3. Tính toán thời lượng (Duration)
    const fps = 30;
    let durationInFrames = 150; // Mặc định 5 giây

    if (templateId === 'threads-rising') {
        // Mỗi bài đăng Threads cho chạy 150 frames (5 giây)
        const postCount = videoData.posts?.length || 1;
        durationInFrames = postCount * 150;
    } 
    // Sau này bạn có thể thêm các case khác cho template khác ở đây

    return (
        <>
            <Composition
                id="MainVideo"
                component={ThreadsRising} // Bạn có thể dùng logic chọn component nếu có nhiều template
                durationInFrames={durationInFrames}
                fps={fps}
                width={1080}
                height={1920}
                // Truyền toàn bộ videoData vào làm Props cho Template
                defaultProps={videoData}
            />
        </>
    );
};
