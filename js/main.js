// ========== FORM VALIDATION ==========

// Set max date (today minus 2 years)
const hoje = new Date();
const doisAnosAtras = new Date(hoje.getFullYear() - 2, hoje.getMonth(), hoje.getDate());
const dataMaxima = doisAnosAtras.toISOString().split('T')[0];

document.getElementById('dataCarta').setAttribute('max', dataMaxima);

// Set min pick-up date (tomorrow)
const amanha = new Date(hoje);
amanha.setDate(amanha.getDate() + 1);
document.getElementById('data_levantamento').setAttribute('min', amanha.toISOString().split('T')[0]);

// Update return date min based on pick-up
document.getElementById('data_levantamento').addEventListener('change', function() {
  const dataLev = new Date(this.value);
  dataLev.setDate(dataLev.getDate() + 1);
  document.getElementById('data_devolucao').setAttribute('min', dataLev.toISOString().split('T')[0]);
});

// Form validation on submit
document.getElementById('formReserva').addEventListener('submit', function(e) {
  const dataCarta = new Date(document.getElementById('dataCarta').value);
  const doisAnosAtras = new Date();
  doisAnosAtras.setFullYear(doisAnosAtras.getFullYear() - 2);

  document.getElementById('erroCarta').style.display = 'none';
  document.getElementById('dataCarta').classList.remove('erro');

  if (dataCarta > doisAnosAtras) {
    e.preventDefault();
    document.getElementById('erroCarta').style.display = 'block';
    document.getElementById('dataCarta').classList.add('erro');
    document.getElementById('dataCarta').focus();
    return false;
  }

  return true;
});

// Clear error on change
document.getElementById('dataCarta').addEventListener('change', function() {
  document.getElementById('erroCarta').style.display = 'none';
  document.getElementById('dataCarta').classList.remove('erro');
}); 

// ========== SLIDER ==========
let slideAtual = 0;
const track = document.getElementById('sliderTrack');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const totalSlides = 3;
let autoSlide;

function atualizarSlide() {
  if (!track) return;
  track.style.transform = `translateX(-${slideAtual * 100}%)`;
}

function moverSlide(direcao) {
  slideAtual += direcao;
  if (slideAtual >= totalSlides) slideAtual = 0;
  if (slideAtual < 0) slideAtual = totalSlides - 1;
  atualizarSlide();
  resetAuto();
}

function autoPlay() {
  autoSlide = setInterval(() => moverSlide(1), 5000);
}

function resetAuto() {
  clearInterval(autoSlide);
  autoPlay();
}

// Event listeners - BOTOES
if (btnPrev) {
  btnPrev.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    moverSlide(-1);
  });
}

if (btnNext) {
  btnNext.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    moverSlide(1);
  });
}

// Iniciar
atualizarSlide();
autoPlay();

// Pausar ao hover
const slider = document.querySelector('.slider-centro');
if (slider) {
  slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
  slider.addEventListener('mouseleave', autoPlay);
}

// Touch/Swipe
let touchStartX = 0;
if (track) {
  track.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});

  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? moverSlide(1) : moverSlide(-1);
    }
  }, {passive: true});
}

// ========== ZOOM ==========
const zoomModal = document.getElementById('zoomModal');
const zoomImg = document.getElementById('zoomImg');

function abrirZoom(src) {
  if (!zoomModal || !zoomImg) return;
  zoomImg.src = src;
  zoomModal.classList.add('ativo');
  document.body.style.overflow = 'hidden';
}

function fecharZoom() {
  if (!zoomModal) return;
  zoomModal.classList.remove('ativo');
  document.body.style.overflow = '';
}

// Fechar com ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && zoomModal.classList.contains('ativo')) {
    fecharZoom();
  }
});
