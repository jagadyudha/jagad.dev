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
    <div className='rounded-md border border-white border-opacity-10 bg-background_100 p-6 shadow-md sm:p-12 lg:text-center'>
      <div className='mx-auto max-w-3xl'>
        <h3 className=' text-2xl font-bold text-white lg:text-4xl'>
          Subscribe to the newsletter{' '}
        </h3>
        <p className='text-md my-3 text-gray-300 lg:text-xl'>
          Every two weeks, I publish programming-related blogs.
        </p>

        <form onSubmit={contactSubmit}>
          <div className='my-8 flex-none space-x-0 space-y-4 sm:my-14 sm:flex sm:space-y-0 sm:space-x-2'>
            <input
              ref={inputEl}
              type='email'
              className='form-input w-full rounded-md border border-white border-opacity-20 bg-background py-2 text-gray-300  sm:py-4'
              placeholder='me@jagad.dev'
              required
            />
            <button
              className='text-md w-full rounded-md bg-primary bg-opacity-100 px-5 py-2 text-white sm:w-min sm:py-3'
              type='submit'
            >
              Subscribe
            </button>
          </div>

          {message && <p className='mt-2 text-white'>{message}</p>}
          <span className='my-5 block text-gray-400'>
            Only article updates will be sent to your email address.
          </span>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
