class teste {
  async velocidade(metros: number, segundos: number) {
    return await (metros / segundos);
  }
}

const clasteste = new teste();
const x = clasteste.velocidade(10, 2);

console.log(x);
