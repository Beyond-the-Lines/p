const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.querySelector('span').textContent = open ? '−' : '+';
});
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.querySelector('span').textContent = '+';
}));

const infoDialog = document.querySelector('.info-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogCopy = document.querySelector('#dialog-copy');
const newsletterDialog = document.querySelector('.newsletter-dialog');

document.querySelectorAll('[data-dialog-title]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    dialogTitle.textContent = trigger.dataset.dialogTitle;
    dialogCopy.textContent = trigger.dataset.dialogCopy;
    infoDialog.showModal();
  });
});

document.querySelector('[data-newsletter]')?.addEventListener('click', () => newsletterDialog.showModal());
document.querySelectorAll('.dialog-close').forEach((button) => button.addEventListener('click', () => button.closest('dialog').close()));
document.querySelectorAll('dialog').forEach((dialog) => dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
}));
document.querySelector('.newsletter-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.hidden = true;
  document.querySelector('.form-success').hidden = false;
});
