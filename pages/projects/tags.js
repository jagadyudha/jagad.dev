import { getContentful } from '../../lib/contentful';

export const getServerSideProps = async ({ query }) => {
  const data = Object.keys(query);
  const res = await getContentful('project');
  const tag = res.data.items.filter((element) =>
    element.fields.label.some((item) => item === data[0])
  );

  return {
    props: {
      tag,
    },
  };
};

const Tags = ({ tag }) => {
  console.log(tag);
  return (
    <>
      <div>hallo</div>
    </>
  );
};

export default Tags;
