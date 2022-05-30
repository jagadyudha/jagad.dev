import React from 'react';
import useSWR from 'swr';

const NewsLetter = () => {
  //getSubscriber
  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/newsletter', fetcher);

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
    <div>
      <div className='prose prose-invert max-w-none rounded-md border border-white border-opacity-10 bg-background_100 p-6 shadow-md sm:p-8'>
        <h3>Subscribe to the newsletter</h3>
        <p>Every two weeks, I publish programming-related blogs.</p>
        <p>No spam - unsubscribe at any time!</p>
        <form onSubmit={contactSubmit}>
          <div className='relative'>
            <input
              ref={inputEl}
              type='email'
              className='form-input w-full rounded-md bg-background py-2 text-gray-300 sm:py-3'
              placeholder='me@jagad.dev'
              required
            />
            <button
              className='sm:text-md absolute right-2 top-[7px] rounded-md bg-primary bg-opacity-70 px-3 py-1 text-sm text-white sm:px-5 sm:py-2'
              type='submit'
            >
              Subscribe
            </button>
          </div>

          {message && <p>{message}</p>}
          <p>{data?.count} Subscriber</p>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
