import React from 'react';

const NewsLetter = () => {
  const inputEl = React.useRef<HTMLInputElement>(null);
  const [message, setMessage] = React.useState('');

  const contactSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`/api/newsletter`, {
      body: JSON.stringify({
        email: inputEl.current?.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const { error } = await res.json();
    if (error) {
      setMessage(error.email);
      return;
    }

    inputEl.current!.value = '';
    setMessage('Success! 🎉 You are now subscribed to the newsletter.');
  };

  return (
    <div className='rounded-md border border-white border-opacity-10 p-6 shadow-md sm:p-12 lg:text-center'>
      <div className='mx-auto max-w-3xl'>
        <h3 className=' text-2xl font-bold text-white lg:text-4xl'>
          Subscribe to the newsletter{' '}
        </h3>
        <p className='text-md my-3 text-gray-300 lg:text-xl'>
          Every two weeks, I publish programming-related blogs.
        </p>

        <form className='my-14' onSubmit={contactSubmit}>
          <div className='flex space-x-2'>
            <input
              ref={inputEl}
              type='email'
              className='form-input w-full rounded-md border border-white border-opacity-20 bg-background py-3 text-gray-300  sm:py-3'
              placeholder='me@jagad.dev'
              required
            />
            <button
              className='sm:text-md right-2 rounded-md bg-primary bg-opacity-100 px-3 py-1 text-sm text-white sm:px-5 sm:py-2'
              type='submit'
            >
              Subscribe
            </button>
          </div>

          {message && <p className='mt-2 text-white'>{message}</p>}
          <p className='my-5 text-gray-400'>
            Only article updates will be sent to your email address.
          </p>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
