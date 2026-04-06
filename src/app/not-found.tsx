import Link from 'next/link';

export default function NotFouxnd() {
  return (
    <div className='min-h-screen flex flex-col gap-5 justify-center items-center'>
      <h1 className='text-4xl'>{'404 Page Not Found'}</h1>
      <p>{'해당 페이지는 존재하지 않습니다.'}</p>

      <Link href='/blog' className='bg-accent1 text-white rounded-md px-4 py-2 hover:bg-accent1/80'>{'블로그 홈으로 이동'}</Link>
    </div>
  );
}
