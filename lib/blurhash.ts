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
  const plaiceholders:Array<string> = await Promise.all(
    blur.map(async (item: any) => {
      const { base64 } = await getPlaiceholder(`https:${item.fields.file.url}`);
      return base64;
    })
  ).then((values) => values);

  return plaiceholders
};

export const blurhashprojects = async (blur:{fields:{file:{url:string}}}) => {
  const plaiceholders = await getPlaiceholder(
    `https:${blur.fields.file.url}`
  );

  return plaiceholders
};
