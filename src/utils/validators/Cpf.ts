export function isValidCpf(cpf: string): boolean {
  const cpfOnlyNumber: string = cpf.replace(/\D/g, '');

  if (cpfOnlyNumber.length != 11) return false;
  if (/^(\d)\1{10}$/.test(cpfOnlyNumber)) return false;

  const CalcDigito = (digits: string, fatorial: number): number => {
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      sum += parseInt(digits[i], 10) * (fatorial - i);
    }
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  const D1Esperado = CalcDigito(cpfOnlyNumber.slice(0, 9), 10);
  const D2Esperado = CalcDigito(cpfOnlyNumber.slice(0, 10), 11);

  const D1Recebido = parseInt(cpfOnlyNumber[9], 10);
  const D2Recebido = parseInt(cpfOnlyNumber[10], 10);

  return D1Esperado === D1Recebido && D2Esperado === D2Recebido;
}
