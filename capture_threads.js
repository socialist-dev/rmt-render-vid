const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function capture() {
    // 1. Đọc dữ liệu từ n8n gửi lên (n8n gửi vào file input.json)
    const inputPath = path.join(__dirname, 'input.json');
    if (!fs.existsSync(inputPath)) {
        console.error("Không tìm thấy file input.json");
        process.exit(1);
    }
    const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
    const posts = input.videoData.posts || [];

    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    // Đặt kích thước màn hình lớn để ảnh chụp sắc nét (Retina)
    await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 2 });

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        // Sử dụng link Embed chính thức của Threads
        // Ví dụ: https://www.threads.net/t/C_xxxx/embed
        const embedUrl = `${post.url}/embed`;

        console.log(`Đang chụp bài đăng ${i}: ${embedUrl}`);
        
        await page.goto(embedUrl, { waitUntil: 'networkidle2' });
        
        // Đợi cho đến khi cái khung bài đăng Threads hiện ra
        await page.waitForSelector('article', { timeout: 15000 });

        // Chụp riêng cái khung bài đăng (article)
        const element = await page.$('article');
        await element.screenshot({
            path: path.join(__dirname, 'public', `post_${i}.png`),
            omitBackground: true // Để nền trong suốt
        });
    }

    await browser.close();
    console.log("Hoàn thành chụp ảnh tất cả bài đăng!");
}

capture().catch(err => {
    console.error(err);
    process.exit(1);
});
