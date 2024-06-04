export default function handlePromise(promise:Promise<any>) {
    return promise.then((data) => [data]).catch((err) => [null, err]);
  }