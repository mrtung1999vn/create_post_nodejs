const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const sharp = require('sharp'); // Import sharp library for image format conversion

// Function to generate image with attributes and custom size
async function generateImage(attributes, width, height) {
    const { title, rating, tags, comments } = attributes;

    // Create a canvas instance with custom size
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    // Draw background
    context.fillStyle = '#f0f0f0';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw title
    context.font = '24px Arial';
    context.fillStyle = '#333';
    context.fillText(title, 50, 30);

    // Draw rating stars
    const starSize = 30;
    for (let i = 0; i < rating; i++) {
        drawStar(context, 400 + i * (starSize + 5), 15, starSize, '#f1c40f');
    }

    // Draw tags
    context.font = '16px Arial';
    context.fillStyle = '#555';
    context.fillText('Tags: ' + tags.join(', '), 50, 70);

    // Draw comments
    context.font = '18px Arial';
    context.fillStyle = '#666';
    wrapText(context, comments, 50, 100, canvas.width - 100, 25);

    // Convert canvas to buffer in PNG format
    const buffer = canvas.toBuffer('image/png');

    // Convert PNG buffer to JPG buffer using sharp
    const jpgBuffer = await sharp(buffer).jpeg().toBuffer();

    // Save JPG buffer to file
    fs.writeFileSync('./generated_image.jpg', jpgBuffer);

    console.log('Image generated successfully.');
}

// Function to draw a star (unchanged)
function drawStar(ctx, x, y, radius, color) {
    // implementation remains the same
}

// Function to wrap text (unchanged)
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    // implementation remains the same
}

// Example usage with custom size (800x600 pixels)
const attributes = {
    title: 'demo mau',
    rating: 5,
    tags: ['tag1', 'tag2', 'tag3'],
    comments: 'Nhập nội dung mô tả cho hình ảnh ở đây. Có thể là một đoạn văn bản dài.'
};

function getCurrentDate() {
    const now = new Date();

    // Lấy thông tin năm, tháng và ngày
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');  // Tháng bắt đầu từ 0, cần cộng thêm 1 và định dạng lại
    const day = String(now.getDate()).padStart(2, '0');        // Ngày trong tháng

    // Định dạng thành chuỗi "yyyy-mm-dd"
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}

// Sử dụng hàm để lấy ngày hiện tại định dạng "yyyy-mm-dd"
const currentDate = getCurrentDate();
console.log(currentDate);  // In ra ngày hiện tại định dạng "yyyy-mm-dd"

function generate_post(tuKhoa, description, keywords, content, sectionH01, sectionH02, sectionH03,section01, section02, section03){
    try {

        let section = `
        <section>
            <h2>1. ${ sectionH01 }</h2>
            <p>${ section01}. </p>
        </section>

        <section>
            <h2>1. ${ sectionH02 }</h2>
            <p>${ section02}. </p>
        </section>

        <section>
            <h2>1. ${ sectionH03 }</h2>
            <p>${ section03}. </p>
        </section>
        `
        let html_p = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${ tuKhoa }</title>
                <meta name="description" content="${ description }">
                <meta name="keywords" content="${ keywords }">
                <meta name="author" content="Thanh Tùng">
                <link rel="shortcut icon" href="assets/images/favicon.png" type="image/x-icon">
                <meta name="robots" content="index, follow">
                <link rel="shortcut icon" href="assets/images/favicon.png" type="image/x-icon">

            </head>
            <body>
                <header>
                    <h1>${ tuKhoa }</h1>
                    <p>Xuất bản <time datetime="${ currentDate }">${ currentDate }</time> by <span itemprop="author">Thanh Tùng</span></p>
                </header>
            
                <main>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14916.062709176!2d106.7034523!3d20.8310734!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7bec894d7af1%3A0x43aefcb84213a95b!2sT%26T%20Hotel%20%26%20apartment!5e0!3m2!1svi!2s!4v1718537823760!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    <article>
                        <p>${ content }.</p>
            
                        ${ section }
            
                        <footer>
                            <p>&copy; 2024 - <a href="https://facebook.com/thanhtung0309hp"> Thanh Tùng - AT AGENCY MARKETING</a>  </p>
                        </footer>
                    </article>
                </main>
            
                <footer>
                    <p>&copy; 2024 - <a href="https://tthotel-apart.com/"> T & T hotel and apartment - Khách sạn văn cao Hải Phòng </a>  </p>
                    <p>&copy; 2024 - <a href="https://facebook.com/thanhtung0309hp"> Thanh Tùng - AT AGENCY MARKETING</a>  </p>
                </footer>
            </body>
            </html>
        `

        // Example usage: Writing the string to a file (Node.js example)
        const fs = require('fs');
        fs.writeFileSync(`${  tuKhoa }.html`, html_p);

        console.log(`HTML file created successfully. ${ tuKhoa }`);
    } catch (error) {
        
    }
}





const sqlite3 = require('sqlite3').verbose();

// Open SQLite database
const db = new sqlite3.Database('documents.db');

// Create table
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        keyword TEXT,
        description TEXT,
        keywords TEXT,
        content TEXT,
        sectionH01 TEXT,
        sectionH02 TEXT,
        sectionH03 TEXT,
        section01 TEXT,
        section02 TEXT,
        section03 TEXT
    )`);
});


// Example data
const data = {
    keyword: 'khách sạn',
    description: 'Tầm quan trọng của tiêu chuẩn và chứng nhận trong ngành khách sạn',
    keywords: 'tiêu chuẩn khách sạn, chứng nhận khách sạn, quản lý khách sạn',
    content: 'Nội dung chi tiết về tiêu chuẩn và chứng nhận trong ngành khách sạn...',
    sectionH01: 'Tầm quan trọng của Tiêu chuẩn và Chứng nhận',
    sectionH02: 'Đảm bảo Chất lượng và Sự Tin cậy',
    sectionH03: 'Lợi ích cho Khách hàng và Chủ khách sạn',
    section01: 'Tiêu chuẩn và chứng nhận đóng vai trò quan trọng trong ngành khách sạn...',
    section02: 'Các tổ chức chứng nhận như ISO và các cơ quan địa phương đặt ra hướng dẫn...',
    section03: 'Khách hàng hưởng lợi từ việc lưu trú tại các khách sạn có chứng nhận...'
};

// Insert data
for (let i=0;i<50;i++){
    db.run(`INSERT INTO documents (keyword, description, keywords, content, sectionH01, sectionH02, sectionH03, section01, section02, section03)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [data.keyword, data.description, data.keywords, data.content,
         data.sectionH01, data.sectionH02, data.sectionH03,
         data.section01, data.section02, data.section03],
        function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log(`A new document has been added with ID: ${this.lastID}`);
});
}



// Select data
db.all(`SELECT * FROM documents`, (err, rows) => {
    if (err) {
        console.error(err.message);
        // Handle error here if needed
    } else {
        for (i=0;i<50;i++){
            if (rows && rows.length > 0) {
                rows.forEach(row => {
                    generate_post(row.keyword, row.description, row.keyword, row.content, row.sectionH01, row.sectionH02, row.sectionH03, row.section01, row.section02, row.section03)
                });
            } else {
                console.log('No data found');
            }
        }
        
    }
});
// Close database connection
db.close();

// generateImage(attributes, 800, 600); // Specify desired width and height