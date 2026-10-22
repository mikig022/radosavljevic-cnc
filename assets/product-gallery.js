(() => {
  const dialog = document.querySelector('.product-lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  const image = document.createElement('img');
  const caption = dialog.querySelector('#product-lightbox-caption');
  const closeButton = dialog.querySelector('.product-lightbox__close');
  caption.before(image);
  let trigger = null;

  for (const link of document.querySelectorAll('[data-product-lightbox]')) {
    link.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      trigger = link;
      image.src = link.href;
      image.alt = link.querySelector('img')?.alt || '';
      caption.textContent = link.dataset.caption || image.alt;
      dialog.showModal();
    });
  }

  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    image.removeAttribute('src');
    if (trigger?.isConnected) trigger.focus();
    trigger = null;
  });
})();
