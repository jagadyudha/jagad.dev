import { getPlaiceholder } from 'plaiceholder';

export const blurhash = async (blur:Array<any>) => {
  const plaiceholders:Array<string> = await Promise.all(
    blur.map(async (item:any) => {
      const { base64 } = await getPlaiceholder(
        `https:${item.fields.img[0].fields.file.url}`
      );

      return base64;
    })
  ).then((values) => values);
  return plaiceholders
};

export const blurhashslug = async (blur:Array<any>) => {
  const plaiceholders:any = await Promise.all(
    blur[0].fields.img.map(async (item: any) => {
      const { base64 } = await getPlaiceholder(`https:${item.fields.file.url}`);
      return base64;
    })
  ).then((values) => values);

  return plaiceholders
};
