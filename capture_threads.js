const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function capture() {
    const inputPath = path.join(__dirname, 'input.json');
    if (!fs.existsSync(inputPath)) {
        console.error("❌ Không tìm thấy file input.json");
        process.exit(1);
    }
    
    const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
    const posts = input.videoData?.posts || [];

    if (posts.length === 0) {
        console.log("⚠️ Không có bài đăng nào trong posts!");
        return;
    }

    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 2 });

    const publicDir = path.join(__dirname, 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        
        // 1. Xác định URL bài đăng Threads
        let postUrl = post.url;
        if (!postUrl && post.id) {
            const handle = post.handle || 'threads';
            postUrl = `https://www.threads.com/@${handle}/post/${post.id}`;
        }

        if (!postUrl) {
            console.error(`❌ Bài đăng ${i} thiếu trường 'url' hoặc 'id' trong n8n JSON!`);
            continue;
        }

        console.log(`📸 Đang chụp bài đăng ${i}: ${postUrl}`);

        try {
            // Nhúng mã HTML chứa embed chính thức của Threads
            const htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <style>
                        body {
                            background: transparent;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            min-height: 100vh;
                            margin: 0;
                        }
                    </style>
                </head>
                <body>
                    <blockquote class="text-post-media" 
                                data-text-post-permalink="${postUrl}" 
                                data-text-post-version="0">
                    </blockquote>
                    <script async src="https://www.threads.com/embed.js"></script>
                </body>
                </html>
            `;

            await page.setContent(htmlContent, { waitUntil: 'networkidle2' });
            
            // Đợi script embed của Meta biến blockquote thành iframe (tối đa 15s)
            await page.waitForSelector('iframe', { timeout: 15000 });
            // Chờ thêm 1.5s để ảnh/avatar trong embed tải đủ
            await new Promise(r => setTimeout(r, 1500));

            const iframeElement = await page.$('iframe');
            if (iframeElement) {
                await iframeElement.screenshot({
                    path: path.join(publicDir, `post_${i}.png`),
                    omitBackground: true
                });
                console.log(`✅ Chụp thành công: post_${i}.png`);
            } else {
                console.error(`❌ Không tìm thấy phần tử để chụp cho bài đăng ${i}`);
            }
        } catch (err) {
            console.error(`❌ Lỗi chụp bài đăng ${i}:`, err.message);
        }
    }

    await browser.close();
    console.log("🎉 Hoàn thành xử lý screenshot!");
}

capture().catch(err => {
    console.error("Lỗi tổng:", err);
    process.exit(1);
});
