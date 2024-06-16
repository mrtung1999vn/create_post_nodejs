const ffmpeg = require('fluent-ffmpeg');

// Đường dẫn đến video đầu vào
const inputVideoPath = './videogoc/1.mp4';

// Đường dẫn đến video đầu ra
const outputVideoPath = './videokhoiphuc/2.mp4';

// Số lần xử lý nhiễu
const noiseReductionLevel = 20;

// Số lần làm sắc nét ảnh
const sharpenLevel = 0.5;

ffmpeg()
  // Đọc video đầu vào và áp dụng xử lý nhiễu
  .input(inputVideoPath)
  .complexFilter([
    `[0:v]noise=alls=${noiseReductionLevel}[v1]`
  ])
  // Đọc ảnh đầu vào và áp dụng làm sắc nét
  .complexFilter([
    `[1:v]unsharp=luma_msize_x=5:luma_msize_y=5:luma_amount=${sharpenLevel}[l1]`
  ])
  // Kết hợp video đã xử lý nhiễu và ảnh đã làm sắc nét
  .complexFilter([
    '[v1][l1]overlay'
  ])
  // Thiết lập định dạng và đường dẫn cho video đầu ra
  .output(outputVideoPath)
  // Thực thi
  .on('end', () => {
    console.log('Hoàn thành gộp khôi phục video, xử lý nhiễu và làm sắc nét ảnh.');
  })
  .on('error', (err) => {
    console.error('Lỗi khi gộp khôi phục video, xử lý nhiễu và làm sắc nét ảnh:', err);
  })
  .run();