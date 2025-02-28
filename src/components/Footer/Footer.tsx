import './Footer.css';

function Footer() {
  return (
    <footer id={'footer'}>
      <span className={'add-background'}>
        &copy;{' '}
        <a href={'https://killiangrant.com'} target={'_blank'}>
          Killian Louis Grant
        </a>
      </span>
    </footer>
  );
}

export default Footer;
