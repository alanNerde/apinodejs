export function isValidCnpj(input: string): boolean {
  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const cnpjOnlyNumber: string = input.replace(/\D/g, '');

  if (cnpjOnlyNumber.length != 14) return false;
  if (/^(\d)\1{13}$/.test(cnpjOnlyNumber)) return false;

  function calcularDigito(peso: number[], cnpjNumber: string): number {
    let somatorio: number = 0;
    for (let i = 0; i < peso.length; i++) {
      somatorio = somatorio + peso[i] * parseInt(cnpjNumber[i], 10);
    }
    const r = somatorio % 11;
    const digitoVerificador = r < 2 ? 0 : 11 - r;
    return digitoVerificador;
  }

  const dig1 = calcularDigito(pesos1, cnpjOnlyNumber);
  const dig2 = calcularDigito(pesos2, cnpjOnlyNumber);

  return (
    parseInt(cnpjOnlyNumber[12], 10) === dig1 &&
    parseInt(cnpjOnlyNumber[13], 10) === dig2
  );
}
