// import Image from 'next/image';

// const IconList = [
//   {
//     icon: '/blog/images/github.svg',
//     alt: 'github',
//     link: 'https://github.com/hwonda',
//   },
//   {
//     icon: '/blog/images/portfolio.svg',
//     alt: 'portfolio',
//     link: 'https://www.hwonda.com',
//   },
//   {
//     icon: '/blog/images/linkedin.svg',
//     alt: 'linkedin',
//     link: 'https://www.linkedin.com/in/hwonda',
//   },
// ];

export default function Footer() {
  return (
    <footer className='w-full min-h-20 mt-20'>
      {/* <div className='flex justify-center mb-7'>
        <a href="https://hits.sh/hwonda.com/"><img alt="Hits" src="https://hits.sh/hwonda.com.svg?view=today-total&style=flat-square&label=visitors&color=fb923c&labelColor=fb923c"/></a>
      </div> */}
      {/* <div className='flex gap-5 justify-center items-center'>
        {
          IconList.map(({ icon, alt, link }) => (
            <button aria-label={alt} type='button' key={alt} className='flex flex-col justify-center items-center opacity-50 hover:opacity-100'>
              <a href={link} target='_blank' rel='noopener noreferrer'>
                <Image src={icon} alt={alt} width={32} height={32} />
              </a>
              <p className='text-impact'>{alt}</p>
            </button>
          ))
        }
      </div> */}
      <div className='flex justify-center items-center h-20 bg-gray5'>
        <p className='text-gray1'>
          {'© 2024 주다훤 All rights reserved.'}
        </p>
      </div>
    </footer>
  );
}