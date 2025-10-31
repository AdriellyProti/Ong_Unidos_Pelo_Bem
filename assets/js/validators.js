export const Validators = {
  required: v => (v?.trim()?.length ? '' : 'Campo obrigatório.'),
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'E-mail inválido.',
  min: n => v => (v?.trim().length >= n ? '' : `Mínimo de ${n} caracteres.`)
};

export function attachContactFormValidation(){
  const form = document.querySelector('#contact-form');
  if(!form) return;

  const fields = {
    nome: [Validators.required, Validators.min(3)],
    email: [Validators.required, Validators.email],
    mensagem: [Validators.required, Validators.min(10)]
  };

  const showError = (input, msg) => {
    const feedback = input.closest('.field')?.querySelector('.feedback');
    if(feedback){
      feedback.textContent = msg || '✓ Ok';
      feedback.className = 'feedback ' + (msg ? 'error' : 'success');
    }
  };

  form.addEventListener('input', (e)=>{
    const input = e.target;
    if(!(input.name in fields)) return;
    const errors = fields[input.name].map(fn=>fn(input.value)).filter(Boolean);
    showError(input, errors[0] ?? '');
  });

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let hasError = false;
    Object.entries(fields).forEach(([name, rules])=>{
      const input = form.elements[name];
      const errors = rules.map(fn=>fn(input.value)).filter(Boolean);
      showError(input, errors[0] ?? '');
      if(errors.length) hasError = true;
    });

    if(!hasError){
      const payload = {
        nome: form.nome.value.trim(),
        email: form.email.value.trim(),
        mensagem: form.mensagem.value.trim(),
        dt: new Date().toISOString()
      };
      const list = JSON.parse(localStorage.getItem('contatos')||'[]');
      list.push(payload);
      localStorage.setItem('contatos', JSON.stringify(list));
      form.reset();
      alert('Mensagem enviada! (simulação)');
    }
  });
}
