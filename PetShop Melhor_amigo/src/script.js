window.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById("form-contato");
  const msgSucesso = document.getElementById("msg-sucesso");

  // Função para mostrar erro no campo
  function mostrarErro(input, mensagem) {
    const formControl = input.closest('.form-control'); 
    const erroMsg = formControl.querySelector(".erro-msg"); 
    input.classList.add("erro"); 
    erroMsg.innerText = mensagem; 
    erroMsg.style.display = "block"; 
  }

  // Função para limpar o erro no campo
  function limparErro(input) {
    const formControl = input.closest('.form-control'); 
    const erroMsg = formControl.querySelector(".erro-msg"); 
    input.classList.remove("erro"); 
    erroMsg.innerText = ""; 
    erroMsg.style.display = "none"; 
  }

  // Validações de campos
  function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

function validarTelefone(telefone) {
  const numeros = telefone.replace(/\D/g, "");

  return numeros.length === 11;
}


  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valido = true;

    const nome = form.nome;
    const email = form.email;
    const telefone = form.telefone;
    const mensagem = form.mensagem;

    // Limpar erros antes da validação
    [nome, email, telefone, mensagem].forEach(limparErro);

    // Validação nome
    if (!nome.value.trim() || nome.value.trim().length < 2) {
      mostrarErro(nome, "Por favor, insira um nome válido com ao menos 2 caracteres.");
      valido = false;
    }

    // Validação email
    if (!email.value.trim()) {
      mostrarErro(email, "E-mail é obrigatório.");
      valido = false;
    } else if (!validarEmail(email.value.trim())) {
      mostrarErro(email, "Por favor, insira um e-mail válido.");
      valido = false;
    }

    // Validação telefone
    if (telefone.value.trim() && !validarTelefone(telefone.value.trim())) {
      mostrarErro(telefone, "Telefone inválido. O número deve ter 11 dígitos (DDD + 9 dígitos).");
      valido = false;
    }

    // Validação mensagem
    if (!mensagem.value.trim() || mensagem.value.trim().length < 10) {
      mostrarErro(mensagem, "Mensagem deve ter ao menos 10 caracteres.");
      valido = false;
    }

    if (valido) {
      msgSucesso.style.display = "block";
      form.reset();
      setTimeout(() => { msgSucesso.style.display = "none"; }, 3000);
    }
  });

  // Validação em tempo real enquanto o usuário digita
  form.nome.addEventListener("input", () => limparErro(form.nome));
  form.email.addEventListener("input", () => limparErro(form.email));
  form.telefone.addEventListener("input", () => limparErro(form.telefone));
  form.mensagem.addEventListener("input", () => limparErro(form.mensagem));
});