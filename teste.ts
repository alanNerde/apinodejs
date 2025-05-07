console.log('Início'); // (1) síncrono
setTimeout(() => console.log('T1'), 0); // (2) macro-tarefa
Promise.resolve()
  .then(() => console.log('P1')) // (3) micro-tarefa
  .then(() => console.log('P2'));
console.log('Fim'); // (4) síncrono
