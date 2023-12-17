const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function drawPentagon(ctx, color, size) {
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const radius = size / 2;
    ctx.beginPath();
    ctx.moveTo(x, y - radius);

    for (let i = 1; i <= 5; i++) {
        const angle = (i * 2 * Math.PI) / 5;
        const newX = x + radius * Math.sin(angle);
        const newY = y - radius * Math.cos(angle);
        ctx.lineTo(newX, newY);
    }

    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

function drawHexagon(ctx, color, size) {
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const radius = size / 2;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);

    for (let i = 1; i <= 6; i++) {
        const angle = (i * Math.PI) / 3;
        const newX = x + radius * Math.cos(angle);
        const newY = y + radius * Math.sin(angle);
        ctx.lineTo(newX, newY);
    }

    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

function drawShape(ctx, color, shape, size) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (shape === 'circle') {
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, size / 2, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
    } else if (shape === 'square') {
        ctx.fillStyle = color;
        ctx.fillRect(canvas.width / 2 - size / 2, canvas.height / 2 - size / 2, size, size);
    } else if (shape === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2 - size / 2);
        ctx.lineTo(canvas.width / 2 + size / 2, canvas.height / 2 + size / 2);
        ctx.lineTo(canvas.width / 2 - size / 2, canvas.height / 2 + size / 2);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    } else if (shape === 'pentagon') {
        drawPentagon(ctx, color, size);
    } else if (shape === 'hexagon') {
        drawHexagon(ctx, color, size);
    }
}

function animateShape() {
    const color = document.getElementById('color').value;
    const shape = document.getElementById('shape').value;
    const size = document.getElementById('size').value;

    let angle = 0;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawShape(ctx, color, shape, size);

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        drawShape(ctx, color, shape, size);
        ctx.restore();

        angle += 1;

        if (angle < 360) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}