import Image from '@/components/image';

export const ProfileCard = ({ dates }) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date(dates);
  const contentDate = `${date.getDate()} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`;

  return (
    <div className='my-10 flex'>
      <div className='w-12'>
        <Image
          src='/ava.jpg'
          width='50'
          height='50'
          quality='50'
          alt='photo of jagad yudha awali'
          className='rounded-full'
        />
      </div>
      <div className='mx-2'>
        <p className='sm:text-md text-gray-300 font-semibold'>
          Jagad Yudha Awali
        </p>
        <p className='sm:text-sm text-gray-300'>{contentDate}</p>
      </div>
    </div>
  );
};
