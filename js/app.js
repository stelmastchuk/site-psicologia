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
      faq: [
        { pergunta: 'Como funciona a primeira sessão?', resposta: 'A primeira sessão é um momento para que possamos nos conhecer. Vamos conversar sobre o que fez você procurar terapia, entender suas necessidades e pensar juntas nos próximos passos do processo. Você não precisa chegar sabendo explicar tudo o que sente ou contar toda a sua história logo no primeiro encontro. Esse espaço será construído no seu tempo.' },
        { pergunta: 'A terapia é on-line ou presencial?', resposta: 'Os atendimentos acontecem de forma online ou presencial em Maringá-PR. Caso tenha dúvidas sobre como funciona essa modalidade, ficarei feliz em explicar e ajudar você a encontrar a melhor forma de iniciar o acompanhamento.' },
        { pergunta: 'Qual é a frequência das sessões?', resposta: 'Em geral, as sessões acontecem uma vez por semana, pois essa frequência favorece a continuidade do processo terapêutico. No entanto, cada caso é avaliado de forma individual e podemos conversar sobre o que faz mais sentido para o seu momento.' },
        { pergunta: 'Quanto tempo dura cada sessão?', resposta: 'As sessões têm duração média de 50 minutos, oferecendo um tempo reservado para que possamos conversar com tranquilidade e desenvolver o processo terapêutico.' },
        { pergunta: 'E se eu nunca fiz terapia?', resposta: 'Não tem problema. É natural sentir dúvidas ou até um pouco de insegurança no início. Meu objetivo é construir um espaço em que você possa se sentir à vontade para falar no seu ritmo, sem a expectativa de "acertar" ou saber exatamente como uma sessão funciona.' },
        { pergunta: 'Como eu começo?', resposta: 'Basta entrar em contato pelo WhatsApp. Ficarei feliz em conversar com você, tirar suas dúvidas e encontrar juntas o melhor horário para iniciar o seu acompanhamento.' }
      ]
    };
  },
  methods: {
    toggleFaq(i) {
      this.faqAberto = this.faqAberto === i ? null : i;
    }
  },
  mounted() {
    const alvos = document.querySelectorAll('section:not(#sobre)');
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('revelado');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    alvos.forEach((s) => { s.classList.add('reveal'); obs.observe(s); });
  }
}).mount('#app');
