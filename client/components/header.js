import Link from 'next/link';

const header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sell tickets', href: '/tickets/new' },
    currentUser && { label: 'My orders', href: '/orders' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className='nav-item'>
          <Link href={href}>
            <a className='nav-link'>{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className='navbar navbar-expand-lg bg-light'>
      <div className='container-fluid'>
        <Link href='/'>
          <a className='navbar-brand'>GiTTix</a>
        </Link>
        <div className='d-flex justify-content-end'>
          <ul className='nav d-flex align-items-center'>{links}</ul>
        </div>
      </div>
    </nav>
  );
};

export default header;
