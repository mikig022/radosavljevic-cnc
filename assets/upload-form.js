/* CNC — browser validation only. File is processed by existing FormSubmit receiver. */
(() => {
  'use strict';
  const form = document.getElementById('cncr-upload-form');
  if (!form) return;
  const upload = document.getElementById('cncr-attachment');
  const message = document.getElementById('form-feedback');
  const MAX_BYTES = 8_000_000;
  const allowed = new Set(['dxf', 'dwg', 'jpg', 'jpeg', 'png']);
  const productionHosts = new Set([
    'cnc-radosavljevic.com',
    'www.cnc-radosavljevic.com'
  ]);
  function validateFile() {
    const file = upload.files && upload.files[0];
    if (!file) { message.textContent = ''; upload.setCustomValidity(''); return true; }
    const ext = file.name.toLowerCase().split('.').pop();
    let error = '';
    if (!allowed.has(ext)) error = 'Dozvoljeni su samo DXF, DWG, JPG/JPEG i PNG fajlovi.';
    else if (file.size > MAX_BYTES) error = 'Fajl je veći od 8 MB.';
    else if (file.size === 0) error = 'Fajl je prazan.';
    upload.setCustomValidity(error);
    message.textContent = error || 'Izabran fajl: ' + file.name;
    return !error;
  }
  upload.addEventListener('change', validateFile);
  form.addEventListener('submit', (event) => {
    if (!validateFile()) {
      event.preventDefault();
      upload.reportValidity();
      return;
    }
    // Avoid accidental real customer inquiries when testing from localhost or GitHub preview.
    if (!productionHosts.has(window.location.hostname)) {
      event.preventDefault();
      message.textContent = 'Lokalni pregled: slanje forme je isključeno.';
    }
  });
})();
