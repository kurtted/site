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

  // Add double-click functionality
  let isDarkMode = false;
  let clickTimeout;
  let clickCount = 0;
  const title = document.getElementById('main-title');
  const overlay = document.querySelector('.transition-overlay');
  const regularElements = document.querySelectorAll('.regular-mode');
  const darkElements = document.querySelectorAll('.dark-mode');
  
  title.addEventListener('click', function() {
    clickCount++;
    
    if (clickCount === 1) {
      clickTimeout = setTimeout(() => {
        clickCount = 0;
      }, 300);
    } else if (clickCount === 2) {
      clearTimeout(clickTimeout);
      clickCount = 0;
      toggleMode();
    }
  });

  function toggleMode() {
    // Start transition with enhanced destructive animation
    overlay.classList.add('active');
    title.classList.add('transition-animation');
    
    // Add shaking effect to the entire container
    document.querySelector('.container').style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
      isDarkMode = !isDarkMode;
      document.body.classList.toggle('dark-mode-active');
      
      regularElements.forEach(el => el.classList.toggle('hidden'));
      darkElements.forEach(el => el.classList.toggle('hidden'));
      
      // End transition
      setTimeout(() => {
        overlay.classList.remove('active');
        title.classList.remove('transition-animation');
        document.querySelector('.container').style.animation = '';
      }, 800);
    }, 1000);
  }

  // Add shake animation keyframes dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-10px) rotate(-1deg); }
      40% { transform: translateX(10px) rotate(1deg); }
      60% { transform: translateX(-10px) rotate(-1deg); }
      80% { transform: translateX(10px) rotate(1deg); }
    }
  `;
  document.head.appendChild(style);

  // Handle window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops.length = Math.floor(canvas.width / fontSize);
    drops.fill(1);
  });
});