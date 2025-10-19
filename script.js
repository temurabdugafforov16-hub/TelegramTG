const sidebar = document.getElementById('sidebar');
const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const content = document.getElementById('content');
const langSelect = document.getElementById('langSelect');
const menuItems = document.querySelectorAll('#menu li');
const contactForm = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');

const translations = {
  uz: { home: 'Bosh sahifa', gallery: 'Galereya', info: 'Asab' },
  ru: { home: 'Главная', gallery: 'Галерея', info: 'Инфо' },
  en: { home: 'Home', gallery: 'Gallery', info: 'Info' },
};

openBtn.addEventListener('click', () => {
  sidebar.classList.remove('closed');
  content.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
  sidebar.classList.add('closed');
  content.classList.add('hidden');
});

langSelect.addEventListener('change', (e) => {
  const lang = e.target.value;
  menuItems.forEach(item => {
    const key = item.getAttribute('data-key');
    item.textContent = translations[lang][key];
  });
});

function loadContacts() {
  contactList.innerHTML = '';
  const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  contacts.forEach(c => {
    const li = document.createElement('li');
    li.textContent = `${c.name} ${c.surname} — ${c.birthyear} — ${c.phone}`;
    contactList.appendChild(li);
  });
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const surname = document.getElementById('surname').value.trim();
  const birthyear = document.getElementById('birthyear').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (!name || !surname || !birthyear || !phone) return;

  const newContact = { name, surname, birthyear, phone };
  const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  contacts.push(newContact);
  localStorage.setItem('contacts', JSON.stringify(contacts));

  contactForm.reset();
  loadContacts();
});

loadContacts();
