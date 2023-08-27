export const getOpenGraphImage = (
  type: 'posts' | 'projects',
  slug: string,
  title: string,
) => {
  if (type === 'posts') {
    const ogimage = `https://res.cloudinary.com/dlpb6j88q/image/upload/w_1200,h_630,c_limit%2Cf_auto%2Cfl_progressive%2Cq_75/w_600,h_630,c_fill,l_jagad.dev:${type}:${slug}:header/fl_layer_apply,g_east/w_192,h_630,c_fill,l_jagad.dev:hr/fl_layer_apply,g_west,x_485/w_500,h_630,c_fit,co_rgb:ffffff,g_west,x_60,y_-40,l_text:arial_50_bold:${encodeURIComponent(
      title,
    ).replace(`'`, '%27')}/jagad.dev/social.png`;
    return ogimage;
  } else if (type === 'projects'){
    return ''
  }
};
