import Image from 'next/image';

const IconList = [
  {
    icon: '/images/github.svg',
    alt: 'github',
    link: 'https://github.com/hwonda',
  },
  {
    icon: '/images/portfolio.svg',
    alt: 'portfolio',
    link: 'https://hwonda.com/portfolio',
  },
  {
    icon: '/images/linkedin.svg',
    alt: 'linkedin',
    link: 'https://www.linkedin.com/in/dahwon-ju-bb9892295/',
  },
]

export default function Footer() {
  return (
    <footer className='w-full min-h-40 mt-20'>
      <div className='flex justify-center mb-7'>
        <a href="https://hits.sh/hwonda.com/"><img alt="Hits" src="https://hits.sh/hwonda.com.svg?view=today-total&style=flat-square&label=visitors&color=fb923c&labelColor=fb923c"/></a>
      </div>
      <div className='flex gap-5 justify-center items-center'>
        {
          IconList.map(({ icon, alt, link }) => (
            <button aria-label={alt} type='button' key={alt} className='flex flex-col justify-center items-center opacity-50 hover:opacity-100'>
              <a href={link}>
                <Image src={icon} alt={alt} width={32} height={32} />
              </a>
              <p className='impact-color text-sm'>{alt}</p>
            </button>
          ))
        }
      </div>
      <div className='flex justify-center items-center h-20'>
        <p className='text-sm text-gray-400 dark:text-gray-500'>
          © 2024 Hwonda All rights reserved.
        </p>
      </div>
    </footer>
  );
}