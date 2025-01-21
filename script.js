document.addEventListener('DOMContentLoaded', function() {
  // Python code background effect
  const canvas = document.getElementById('matrix-bg');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pythonKeywords = [
    'def', 'class', 'import', 'from', 'if', 'else', 'elif',
    'try:', 'except:', 'finally:', 'with', 'as', 'return',
    'yield', 'async', 'await', 'while', 'for', 'in', 'True',
    'False', 'None', 'lambda', 'self', '__init__', '@property'
  ];
  
  const pythonSymbols = '[]{}():.=+-*/><'.split('');
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);
  const codeSpeed = 30;

  function getRandomPythonCode() {
    const r = Math.random();
    if (r < 0.7) {
      return pythonKeywords[Math.floor(Math.random() * pythonKeywords.length)];
    } else {
      return pythonSymbols[Math.floor(Math.random() * pythonSymbols.length)];
    }
  }

  function drawPythonCode() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255, 41, 54, 0.7)';
    ctx.font = fontSize + 'px "Space Mono"';

    for (let i = 0; i < drops.length; i++) {
      const text = getRandomPythonCode();
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillText(text, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(drawPythonCode, codeSpeed);

  // Handle window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops.length = Math.floor(canvas.width / fontSize);
    drops.fill(1);
  });
});