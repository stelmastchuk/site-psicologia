const { createApp } = Vue;

createApp({
  data() {
    return {
      menuAberto: false,
      faqAberto: null,
      contatos: {
        whatsapp: 'https://wa.me/5544999677237?text=Oi%20gostaria%20de%20agendar%20uma%20consulta',
        instagram: 'https://instagram.com/psi.giovanalopes',
        email: 'mailto:psi.giovanalopes@gmail.com'
      },
      faq: [] // preenchido na Task 10
    };
  }
}).mount('#app');
