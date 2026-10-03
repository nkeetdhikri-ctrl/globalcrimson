
  const header = document.querySelector('header');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  function setHeaderHeight(){
    document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
  }
  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);

  function closeNav(){
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }
  function openNav(){
    navLinks.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  }

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    isOpen ? closeNav() : openNav();
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeNav();
  });

  // ---------- Enquiry form -> WhatsApp ----------
  (function(){
    const overlay = document.getElementById('enquiryOverlay');
    const closeBtn = document.getElementById('enquiryClose');
    const courseSelect = document.getElementById('enqCourse');
    const form = document.getElementById('enquiryForm');
    const heroBookNow = document.getElementById('heroBookNow');
    if (!overlay || !form) return;

    const WHATSAPP_NUMBER = '9779812398559'; // 977 + 981 2398559

    function openEnquiry(course){
      if (course && courseSelect.querySelector('option[value="' + CSS.escape(course) + '"]')){
        courseSelect.value = course;
      } else {
        courseSelect.value = '';
      }
      overlay.classList.add('open');
      document.body.classList.add('enquiry-open');
    }
    function closeEnquiry(){
      overlay.classList.remove('open');
      document.body.classList.remove('enquiry-open');
    }

    document.querySelectorAll('.course-chip').forEach(function(chip){
      chip.addEventListener('click', function(){
        openEnquiry(chip.getAttribute('data-course'));
      });
    });

    if (heroBookNow){
      heroBookNow.addEventListener('click', function(){
        openEnquiry('');
      });
    }

    closeBtn.addEventListener('click', closeEnquiry);
    overlay.addEventListener('click', function(e){
      if (e.target === overlay) closeEnquiry();
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') closeEnquiry();
    });

    form.addEventListener('submit', function(e){
      e.preventDefault();
      const course = courseSelect.value;
      const name = document.getElementById('enqName').value.trim();
      const address = document.getElementById('enqAddress').value.trim();
      const contact = document.getElementById('enqContact').value.trim();
      const joining = document.getElementById('enqDate').value;

      const message =
        'Enquiry Form' + '\n' +
        'Course: ' + course + '\n' +
        'Name: ' + name + '\n' +
        'Address: ' + address + '\n' +
        'Contact no: ' + contact + '\n' +
        'Joining Date: ' + joining;

      const waUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
      window.open(waUrl, '_blank', 'noopener');

      form.reset();
      closeEnquiry();
    });
  })();
