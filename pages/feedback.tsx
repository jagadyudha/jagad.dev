import React from 'react';
import Image from '@/components/image';
import supabase from '@/lib/supabase';
import { useRouter } from 'next/router';

const Feedback = () => {
  const router = useRouter();
  const [form, setForm] = React.useState({
    name: '',
    devices: '',
    q1: '4',
    q2: '4',
    q3: '4',
  });

  const contactSubmit = async (e: any) => {
    e.preventDefault();
    router.push('/');
  };
  return (
    <div className='mb-20'>
      <div className='overflow-hidden rounded-lg'>
        <Image
          src='https://images.ctfassets.net/odfc4bgi8fhe/6aMhnryt6LKzRdWOeKVoDb/b96c46cbcfc655e1aa9061c743ce23aa/citizenapp-min.png'
          height={720}
          width={1280}
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAIAAADwyuo0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIklEQVQImWNgYNjGwLDJn6Hk/8f/DAwM0xkY+hkYGhgYCgBkLQcxMhs+mgAAAABJRU5ErkJggg=='
          placeholder='blur'
          layout='responsive'
          alt='Feedback CitizenApp'
        />
      </div>

      <div className='prose prose-invert my-10 mx-auto lg:prose-lg'>
        <strong>CitizenApp Feedback</strong>{' '}
        <p>
          Sebelum meninggalkan feedback, silahkan pasang aplikasi CitizenApp di
          perangkat Anda menggunakan tautan berikut :{' '}
          <span>
            <a
              className='text-primary underline'
              href='https://play.google.com/store/apps/details?id=com.jagadyudha.citizenapp'
              target='_blank'
              rel='noopener noreferrer'
            >
              CitizenApp - Aplikasi di Google Play
            </a>
          </span>
        </p>{' '}
        <p></p>
        <form onSubmit={contactSubmit}>
          <div className='my-5'>
            <strong>Nama Lengkap Anda?</strong>
            <input
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              value={form.name}
              type='text'
              className='form-input my-4 w-full rounded-md bg-background text-gray-300'
              placeholder='Ex. Jagad Yudha'
              required
            />
          </div>
          <div className='my-5'>
            <strong>Apa jenis atau nama perangkat yang anda gunakan?</strong>
            <input
              type='text'
              onChange={(e) => setForm({ ...form, devices: e.target.value })}
              value={form.devices}
              className='form-input my-4 w-full rounded-md bg-background text-gray-300'
              placeholder='Ex. Google Pixel 4'
              required
            />
          </div>
          <div className='my-5'>
            <strong>
              Apakah aplikasi berjalan dengan baik di perangkat Anda?
            </strong>
            <select
              className='form-select my-4 w-full rounded-md bg-background text-gray-300'
              onChange={(e) => setForm({ ...form, q1: e.target.value })}
              value={form.q1}
            >
              <option value='4'>Sangat Baik</option>
              <option value='3'>Baik</option>
              <option value='2'>Buruk</option>
              <option value='1'>Sangat Buruk</option>
            </select>
          </div>
          <div className='my-5'>
            <strong>
              Apakah menurut Anda aplikasi ini membantu dalam menangani
              pelaporan kerusakan fasilitas umum?
            </strong>
            <select
              className='form-select my-4 w-full rounded-md bg-background text-gray-300'
              onChange={(e) => setForm({ ...form, q2: e.target.value })}
              value={form.q2}
            >
              <option value='4'>Sangat Membantu</option>
              <option value='3'>Membantu</option>
              <option value='2'>Sedikit Membantu</option>
              <option value='1'>Tidak Membantu</option>
            </select>
          </div>
          <div className='my-5'>
            <strong>
              Jika Anda sebagai pengguna, apakah fitur QR Code membantu saat
              proses pelaporan?
            </strong>
            <select
              className='form-select my-4 w-full rounded-md bg-background text-gray-300'
              onChange={(e) => setForm({ ...form, q3: e.target.value })}
              value={form.q3}
            >
              <option value='4'>Sangat Membantu</option>
              <option value='3'>Membantu</option>
              <option value='2'>Sedikit Membantu</option>
              <option value='1'>Tidak Membantu</option>
            </select>
          </div>
          <div className='flex justify-center'>
            <input
              className=' rounded-lg bg-teal-600 py-1 px-8 text-white'
              type='submit'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
