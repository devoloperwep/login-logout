export function formatTime(timestamp) {
  console.log(timestamp);
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function getRandomGradientImage(width = 400, height = 400) {
  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;

  const color1 = getRandomColor();
  const color2 = getRandomColor();
  const angle = Math.random() * Math.PI * 2; // radianlarda burchak

  // canvas yaratamiz
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // gradient yasash
  const x = Math.cos(angle) * width;
  const y = Math.sin(angle) * height;
  const gradient = ctx.createLinearGradient(0, 0, x, y);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);

  // canvasga to‘ldirish
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // base64 string qaytaradi (img src uchun ishlaydi)
  return canvas.toDataURL("image/png");
}
